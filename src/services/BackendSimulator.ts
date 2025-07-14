import AsyncStorage from '@react-native-async-storage/async-storage';

export interface SimulatedNotification {
  id: string;
  title: string;
  message: string;
  timestamp: number;
  read: boolean;
  data?: any;
}

class BackendSimulator {
  private notifications: SimulatedNotification[] = [];
  private simulationInterval: NodeJS.Timeout | null = null;

  // Simulate different types of notifications
  private notificationTemplates = [
    {
      title: 'New Message',
      message: 'You have received a new message from John Doe',
      data: { type: 'message', userId: 'user123', chatId: 'chat456' },
    },
    {
      title: 'Voice Call',
      message: 'Incoming voice call from Sarah Wilson',
      data: { type: 'call', callType: 'voice', userId: 'user789' },
    },
    {
      title: 'Video Call',
      message: 'Incoming video call from Mike Johnson',
      data: { type: 'call', callType: 'video', userId: 'user456' },
    },
    {
      title: 'Group Message',
      message: 'New message in Team Chat: "Don\'t forget about the meeting"',
      data: { type: 'group_message', groupId: 'group123', userId: 'user321' },
    },
    {
      title: 'File Shared',
      message: 'Anna shared a document with you',
      data: { type: 'file', fileName: 'Project_Report.pdf', userId: 'user654' },
    },
    {
      title: 'Status Update',
      message: 'Alex updated their status',
      data: { type: 'status', userId: 'user987' },
    },
  ];

  async startSimulation(intervalSeconds: number = 30) {
    console.log(`Starting notification simulation (every ${intervalSeconds} seconds)`);
    
    if (this.simulationInterval) {
      clearInterval(this.simulationInterval);
    }

    this.simulationInterval = setInterval(() => {
      this.generateRandomNotification();
    }, intervalSeconds * 1000);
  }

  stopSimulation() {
    console.log('Stopping notification simulation');
    if (this.simulationInterval) {
      clearInterval(this.simulationInterval);
      this.simulationInterval = null;
    }
  }

  async generateRandomNotification() {
    const template = this.notificationTemplates[
      Math.floor(Math.random() * this.notificationTemplates.length)
    ];

    const notification: SimulatedNotification = {
      id: 'sim_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9),
      title: template.title,
      message: template.message,
      timestamp: Date.now(),
      read: false,
      data: {
        ...template.data,
        source: 'backend_simulation',
        simulatedAt: new Date().toISOString(),
      },
    };

    await this.saveNotification(notification);
    console.log('Generated simulated notification:', notification.title);
    
    return notification;
  }

  async triggerSpecificNotification(type: string) {
    let template;
    
    switch (type) {
      case 'message':
        template = this.notificationTemplates[0];
        break;
      case 'voice_call':
        template = this.notificationTemplates[1];
        break;
      case 'video_call':
        template = this.notificationTemplates[2];
        break;
      case 'group':
        template = this.notificationTemplates[3];
        break;
      case 'file':
        template = this.notificationTemplates[4];
        break;
      case 'status':
        template = this.notificationTemplates[5];
        break;
      default:
        template = this.notificationTemplates[0];
    }

    const notification: SimulatedNotification = {
      id: 'manual_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9),
      title: template.title,
      message: template.message,
      timestamp: Date.now(),
      read: false,
      data: {
        ...template.data,
        source: 'manual_trigger',
        triggeredAt: new Date().toISOString(),
      },
    };

    await this.saveNotification(notification);
    console.log('Triggered specific notification:', notification.title);
    
    return notification;
  }

  private async saveNotification(notification: SimulatedNotification) {
    try {
      // Save to local storage for the app to display
      const existingNotifications = await AsyncStorage.getItem('notifications');
      let notifications: SimulatedNotification[] = [];
      
      if (existingNotifications) {
        notifications = JSON.parse(existingNotifications);
      }
      
      notifications.unshift(notification);
      
      // Keep only the last 50 notifications
      if (notifications.length > 50) {
        notifications = notifications.slice(0, 50);
      }
      
      await AsyncStorage.setItem('notifications', JSON.stringify(notifications));
      
      // Update badge count
      const unreadCount = notifications.filter(n => !n.read).length;
      await AsyncStorage.setItem('badgeCount', unreadCount.toString());
      
    } catch (error) {
      console.error('Error saving simulated notification:', error);
    }
  }

  async getSimulationStatus() {
    return {
      isRunning: this.simulationInterval !== null,
      notificationCount: this.notifications.length,
      templates: this.notificationTemplates.length,
    };
  }

  // Simulate FCM message format
  createFCMMessage(notification: SimulatedNotification) {
    return {
      messageId: notification.id,
      notification: {
        title: notification.title,
        body: notification.message,
      },
      data: {
        ...notification.data,
        timestamp: notification.timestamp.toString(),
        id: notification.id,
      },
      from: 'backend_simulator',
      sentTime: notification.timestamp,
      ttl: 2419200, // 4 weeks in seconds
    };
  }

  // Simulate server endpoint responses
  async simulateServerEndpoint(endpoint: string, data?: any) {
    console.log(`Simulating server endpoint: ${endpoint}`, data);
    
    switch (endpoint) {
      case '/send-notification':
        return this.generateRandomNotification();
      
      case '/send-typed-notification':
        return this.triggerSpecificNotification(data?.type || 'message');
      
      case '/get-user-tokens':
        // Simulate getting FCM tokens for a user
        const token = await AsyncStorage.getItem('fcmToken');
        return { tokens: token ? [token] : [] };
      
      case '/subscribe-topic':
        console.log(`Simulated topic subscription: ${data?.topic}`);
        return { success: true, topic: data?.topic };
      
      case '/unsubscribe-topic':
        console.log(`Simulated topic unsubscription: ${data?.topic}`);
        return { success: true, topic: data?.topic };
      
      default:
        console.log(`Unknown endpoint: ${endpoint}`);
        return { error: 'Unknown endpoint' };
    }
  }
}

export default new BackendSimulator();
