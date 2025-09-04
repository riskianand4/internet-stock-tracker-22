import { User, UserActivity, Role, Permission } from '@/types/users';

export const mockPermissions: Permission[] = [
  { id: '1', name: 'View Products', resource: 'products', action: 'read' },
  { id: '2', name: 'Create Products', resource: 'products', action: 'write' },
  { id: '3', name: 'Delete Products', resource: 'products', action: 'delete' },
  { id: '4', name: 'View Inventory', resource: 'inventory', action: 'read' },
  { id: '5', name: 'Manage Inventory', resource: 'inventory', action: 'write' },
  { id: '6', name: 'View Orders', resource: 'orders', action: 'read' },
  { id: '7', name: 'Manage Orders', resource: 'orders', action: 'write' },
  { id: '8', name: 'View Users', resource: 'users', action: 'read' },
  { id: '9', name: 'Manage Users', resource: 'users', action: 'admin' },
  { id: '10', name: 'System Settings', resource: 'settings', action: 'admin' }
];

export const mockRoles: Role[] = [
  {
    id: '1',
    name: 'User',
    description: 'Basic user with view permissions',
    permissions: mockPermissions.filter(p => p.action === 'read'),
    isDefault: true
  },
  {
    id: '2',
    name: 'Admin',
    description: 'Administrator with full access except user management',
    permissions: mockPermissions.filter(p => p.resource !== 'users' || p.action === 'read'),
    isDefault: false
  },
  {
    id: '3',
    name: 'Super Admin',
    description: 'Full system administrator',
    permissions: mockPermissions,
    isDefault: false
  }
];

export const mockUsers: User[] = [
  {
    id: 'user-001',
    name: 'Ahmad Wijaya',
    email: 'ahmad.wijaya@telnet.co.id',
    role: 'super_admin',
    status: 'active',
    phone: '+62812345678',
    department: 'IT Management',
    position: 'System Administrator',
    createdAt: new Date('2023-01-15'),
    lastLogin: new Date('2024-01-18T09:30:00'),
    permissions: mockPermissions
  },
  {
    id: 'user-002',
    name: 'Ahmad Ridwan',
    email: 'ahmad.ridwan@telnet.co.id',
    role: 'admin',
    status: 'active',
    phone: '+62823456789',
    department: 'Field Operations',
    position: 'Field Supervisor',
    createdAt: new Date('2023-03-20'),
    lastLogin: new Date('2024-01-18T08:15:00'),
    permissions: mockPermissions.filter(p => p.resource !== 'users' || p.action === 'read')
  },
  {
    id: 'user-003',
    name: 'Budi Santoso',
    email: 'budi.santoso@telnet.co.id',
    role: 'admin',
    status: 'active',
    phone: '+62834567890',
    department: 'Technical Services',
    position: 'Technical Lead',
    createdAt: new Date('2023-06-10'),
    lastLogin: new Date('2024-01-17T16:45:00'),
    permissions: mockPermissions.filter(p => p.resource !== 'users' || p.action === 'read')
  },
  {
    id: 'user-004',
    name: 'Siti Nurhaliza',
    email: 'siti.nurhaliza@telnet.co.id',
    role: 'user',
    status: 'active',
    phone: '+62845678901',
    department: 'Installation Team',
    position: 'Field Technician',
    createdAt: new Date('2023-08-25'),
    lastLogin: new Date('2024-01-10T14:20:00'),
    permissions: mockPermissions.filter(p => p.action === 'read')
  },
  {
    id: 'user-005',
    name: 'Denny Kurniawan',
    email: 'denny.kurniawan@telnet.co.id',
    role: 'admin',
    status: 'active',
    phone: '+62856789012',
    department: 'Maintenance',
    position: 'Maintenance Manager',
    createdAt: new Date('2023-05-20'),
    lastLogin: new Date('2024-03-06'),
    permissions: mockPermissions.filter(p => p.resource !== 'users' || p.action === 'read')
  },
  {
    id: 'user-006',
    name: 'Rina Sari',
    email: 'rina.sari@telnet.co.id',
    role: 'user',
    status: 'active',
    phone: '+62867890123',
    department: 'Quality Control',
    position: 'QC Specialist',
    createdAt: new Date('2023-06-15'),
    lastLogin: new Date('2024-03-05'),
    permissions: mockPermissions.filter(p => p.action === 'read')
  },
  {
    id: 'user-007',
    name: 'Agus Hermawan',
    email: 'agus.hermawan@telnet.co.id',
    role: 'user',
    status: 'active',
    phone: '+62878901234',
    department: 'Equipment Management',
    position: 'Equipment Operator',
    createdAt: new Date('2023-07-01'),
    lastLogin: new Date('2024-03-04'),
    permissions: mockPermissions.filter(p => p.action === 'read')
  },
  {
    id: 'user-008',
    name: 'Wahyu Prasetyo',
    email: 'wahyu.prasetyo@telnet.co.id',
    role: 'admin',
    status: 'active',
    phone: '+62889012345',
    department: 'Safety & Security',
    position: 'Safety Officer',
    createdAt: new Date('2023-08-10'),
    lastLogin: new Date('2024-03-03'),
    permissions: mockPermissions.filter(p => p.resource !== 'users' || p.action === 'read')
  }
];

export const mockUserActivities: UserActivity[] = [
  {
    id: '1',
    userId: '1',
    userName: 'Ahmad Wijaya',
    action: 'Login',
    resource: 'auth',
    details: 'User logged in successfully',
    timestamp: new Date('2024-01-18T09:30:00'),
    ipAddress: '192.168.1.100',
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
  },
  {
    id: '2',
    userId: '2',
    userName: 'Siti Nurhaliza',
    action: 'Create Product',
    resource: 'products',
    details: 'Created new product: Router WiFi AX6000',
    timestamp: new Date('2024-01-18T10:15:00'),
    ipAddress: '192.168.1.101',
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
  },
  {
    id: '3',
    userId: '3',
    userName: 'Budi Santoso',
    action: 'View Report',
    resource: 'reports',
    details: 'Generated sales report for January 2024',
    timestamp: new Date('2024-01-18T11:30:00'),
    ipAddress: '192.168.1.102',
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
  },
  {
    id: '4',
    userId: '1',
    userName: 'Ahmad Wijaya',
    action: 'Update Settings',
    resource: 'settings',
    details: 'Updated notification preferences',
    timestamp: new Date('2024-01-18T14:45:00'),
    ipAddress: '192.168.1.100',
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
  }
];