'use client';

import { useState } from 'react';
import { Bell, Check, Clock, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';

const initialNotifications = [
  { id: 1, title: 'New message from Sarah', message: 'Hey, can we discuss the project details?', time: '5 minutes ago', read: false, category: 'message' },
  { id: 2, title: 'Meeting reminder', message: 'Team standup in 30 minutes', time: '10 minutes ago', read: false, category: 'reminder' },
  { id: 3, title: 'Task assigned', message: 'Alex assigned you to the UI redesign task', time: '1 hour ago', read: true, category: 'task' },
  { id: 4, title: 'System update', message: 'The system will be down for maintenance tonight at 2 AM', time: '3 hours ago', read: true, category: 'system' },
  { id: 5, title: 'New comment on your post', message: 'Michael commented on your recent post', time: 'Yesterday', read: true, category: 'social' },
];

export default function NotificationsComponent() {
  const [notifications, setNotifications] = useState(initialNotifications);
  const [isOpen, setIsOpen] = useState(false);

  const unreadCount = notifications.filter((notification) => !notification.read).length;

  const markAllAsRead = () => setNotifications(notifications.map((notification) => ({ ...notification, read: true })));
  const clearAllNotifications = () => setNotifications([]);
  const markAsRead = (id) => setNotifications(notifications.map((n) => (n.id === id ? { ...n, read: true } : n)));
  const removeNotification = (id) => setNotifications(notifications.filter((n) => n.id !== id));

  return (
    <div className="relative">
      <Button variant="outline" size="icon" className="relative" onClick={() => setIsOpen(!isOpen)}>
        <Bell className="h-5 w-5" />
        {unreadCount > 0 && <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 bg-primary text-primary-foreground">{unreadCount}</Badge>}
      </Button>

      {isOpen && (
        <Card className="absolute right-0 mt-2 w-full sm:w-96 shadow-lg z-50">
          <CardHeader className="pb-2">
            <div className="flex justify-between items-center">
              <CardTitle>Notifications</CardTitle>
              <div className="flex gap-2">
                {unreadCount > 0 && <Button variant="ghost" size="sm" onClick={markAllAsRead}><Check className="h-4 w-4 mr-1" />Mark all read</Button>}
                {notifications.length > 0 && <Button variant="ghost" size="sm" onClick={clearAllNotifications}><X className="h-4 w-4 mr-1" />Clear all</Button>}
              </div>
            </div>
            <CardDescription>{notifications.length === 0 ? 'No new notifications' : `You have ${unreadCount} unread notification${unreadCount !== 1 ? 's' : ''}`}</CardDescription>
          </CardHeader>

          <Tabs defaultValue="all">
            <div className="px-4">
              <TabsList className="w-full">
                <TabsTrigger value="all" className="flex-1">All</TabsTrigger>
                <TabsTrigger value="unread" className="flex-1">Unread</TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="all">
              <ScrollArea className="h-[300px] px-4">
                {notifications.length === 0 ? <EmptyState icon={<Bell />} text="No notifications" /> : notifications.map((n) => <NotificationItem key={n.id} notification={n} onMarkAsRead={markAsRead} onRemove={removeNotification} />)}
              </ScrollArea>
            </TabsContent>

            <TabsContent value="unread">
              <ScrollArea className="h-[300px] px-4">
                {notifications.filter((n) => !n.read).length === 0 ? <EmptyState icon={<Check />} text="No unread notifications" /> : notifications.filter((n) => !n.read).map((n) => <NotificationItem key={n.id} notification={n} onMarkAsRead={markAsRead} onRemove={removeNotification} />)}
              </ScrollArea>
            </TabsContent>
          </Tabs>

          <CardFooter className="flex justify-center border-t pt-4 pb-4">
            <Button variant="outline" size="sm" onClick={() => setIsOpen(false)}>Close</Button>
          </CardFooter>
        </Card>
      )}
    </div>
  );
}

function NotificationItem({ notification, onMarkAsRead, onRemove }) {
  return (
    <div className={`p-3 rounded-lg transition-colors ${notification.read ? 'bg-background hover:bg-accent/50' : 'bg-accent/30 hover:bg-accent/50 border-l-4 border-primary'}`}>
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <h4 className="text-sm font-medium">{notification.title}</h4>
          <p className="text-sm text-muted-foreground mt-1">{notification.message}</p>
          <div className="flex items-center mt-2 text-xs text-muted-foreground"><Clock className="h-3 w-3 mr-1" />{notification.time}</div>
        </div>
        <div className="flex flex-col gap-1 ml-2">
          {!notification.read && <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => onMarkAsRead(notification.id)}><Check className="h-3 w-3" /></Button>}
          <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => onRemove(notification.id)}><X className="h-3 w-3" /></Button>
        </div>
      </div>
    </div>
  );
}

function EmptyState({ icon, text }) {
  return (
    <div className="flex flex-col items-center justify-center h-full text-muted-foreground py-8">
      {icon && <div className="h-12 w-12 mb-2 opacity-20">{icon}</div>}
      <p>{text}</p>
    </div>
  );
}
