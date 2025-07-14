import { Linking } from 'react-native';

export interface DeepLinkData {
  screen: string;
  params?: Record<string, any>;
}

class DeepLinkHandler {
  private navigationRef: any = null;

  setNavigationRef(ref: any) {
    this.navigationRef = ref;
  }

  // Parse deep link URL
  parseDeepLink(url: string | any): DeepLinkData | null {
    try {
      // Handle custom scheme: rnpushapp://screen/params
      if (typeof url === 'string' && url.startsWith('rnpushapp://')) {
        const cleanUrl = url.replace('rnpushapp://', '');
        const [screen, ...paramParts] = cleanUrl.split('/');
        
        const params: Record<string, any> = {};
        paramParts.forEach(part => {
          const [key, value] = part.split('=');
          if (key && value) {
            params[key] = decodeURIComponent(value);
          }
        });

        return { screen, params };
      }

      // Handle notification data-based routing
      if (typeof url === 'object' && url && 'screen' in url) {
        return url as DeepLinkData;
      }

      // Handle simple screen names
      if (typeof url === 'string' && !url.includes('://')) {
        return { screen: url };
      }

      return null;
    } catch (error) {
      console.error('Error parsing deep link:', error);
      return null;
    }
  }

  // Navigate based on deep link
  handleDeepLink(deepLinkData: DeepLinkData) {
    if (!this.navigationRef) {
      console.warn('Navigation ref not set, cannot handle deep link');
      return;
    }

    try {
      const { screen, params } = deepLinkData;
      
      console.log(`Handling deep link to screen: ${screen}`, params);

      switch (screen.toLowerCase()) {
        case 'home':
          this.navigationRef.navigate('Home', params);
          break;
        
        case 'notifications':
          this.navigationRef.navigate('Notifications', params);
          break;
        
        case 'settings':
          this.navigationRef.navigate('Settings', params);
          break;
        
        case 'chat':
          // Future: Navigate to specific chat
          this.navigationRef.navigate('Notifications', { 
            ...params, 
            highlightId: params?.chatId || params?.messageId 
          });
          break;
        
        case 'call':
          // Future: Handle incoming call screen
          this.navigationRef.navigate('Home', { 
            ...params, 
            showCallDialog: true 
          });
          break;
        
        default:
          console.warn(`Unknown deep link screen: ${screen}`);
          this.navigationRef.navigate('Home', params);
      }
    } catch (error) {
      console.error('Error handling deep link:', error);
    }
  }

  // Generate deep link URL
  generateDeepLink(screen: string, params?: Record<string, any>): string {
    let url = `rnpushapp://${screen}`;
    
    if (params && Object.keys(params).length > 0) {
      const paramStrings = Object.entries(params).map(
        ([key, value]) => `${key}=${encodeURIComponent(String(value))}`
      );
      url += '/' + paramStrings.join('/');
    }
    
    return url;
  }

  // Check if URL can be opened
  async canOpenURL(url: string): Promise<boolean> {
    try {
      return await Linking.canOpenURL(url);
    } catch (error) {
      console.error('Error checking URL:', error);
      return false;
    }
  }

  // Open external URL
  async openURL(url: string): Promise<boolean> {
    try {
      const canOpen = await this.canOpenURL(url);
      if (canOpen) {
        await Linking.openURL(url);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error opening URL:', error);
      return false;
    }
  }

  // Get initial URL (when app is opened via deep link)
  async getInitialURL(): Promise<string | null> {
    try {
      return await Linking.getInitialURL();
    } catch (error) {
      console.error('Error getting initial URL:', error);
      return null;
    }
  }

  // Set up deep link listener
  setupDeepLinkListener() {
    const handleURL = (event: { url: string }) => {
      const deepLinkData = this.parseDeepLink(event.url);
      if (deepLinkData) {
        this.handleDeepLink(deepLinkData);
      }
    };

    // Add listener for deep links when app is already running
    const subscription = Linking.addEventListener('url', handleURL);

    // Check for initial URL when app is launched
    this.getInitialURL().then(url => {
      if (url) {
        const deepLinkData = this.parseDeepLink(url);
        if (deepLinkData) {
          // Delay navigation to ensure navigation is ready
          setTimeout(() => this.handleDeepLink(deepLinkData), 1000);
        }
      }
    });

    return () => subscription?.remove();
  }

  // Create notification with deep link
  createNotificationDeepLinkData(screen: string, params?: Record<string, any>) {
    return {
      deepLink: this.generateDeepLink(screen, params),
      screen,
      params: params || {},
    };
  }

  // Extract deep link from notification data
  extractDeepLinkFromNotification(notificationData: any): DeepLinkData | null {
    try {
      // Check for explicit deep link
      if (notificationData.deepLink) {
        return this.parseDeepLink(notificationData.deepLink);
      }

      // Check for screen in data
      if (notificationData.screen) {
        return {
          screen: notificationData.screen,
          params: notificationData.params || {},
        };
      }

      // Infer from notification type
      if (notificationData.type) {
        switch (notificationData.type) {
          case 'message':
          case 'group_message':
            return {
              screen: 'notifications',
              params: {
                chatId: notificationData.chatId,
                userId: notificationData.userId,
              },
            };
          
          case 'call':
            return {
              screen: 'home',
              params: {
                showCallDialog: true,
                callType: notificationData.callType,
                userId: notificationData.userId,
              },
            };
          
          default:
            return { screen: 'notifications' };
        }
      }

      return null;
    } catch (error) {
      console.error('Error extracting deep link from notification:', error);
      return null;
    }
  }
}

export default new DeepLinkHandler();
