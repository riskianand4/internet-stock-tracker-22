import { Asset } from '@/types/assets';

export const mockAssets: Asset[] = [
  {
    id: 'asset-001',
    name: 'Palu Besar',
    category: 'Tools',
    code: 'TL-001',
    description: 'Palu besar untuk instalasi kabel',
    condition: 'excellent',
    status: 'available',
    location: 'Gudang A - Rak 1',
    purchaseDate: new Date('2023-01-15'),
    purchasePrice: 150000,
    picId: 'user-002',
    picName: 'Ahmad Ridwan',
    maintenanceHistory: [
      {
        id: 'maint-001',
        assetId: 'asset-001',
        type: 'inspection',
        description: 'Pemeriksaan rutin kondisi palu',
        cost: 0,
        performedBy: 'Ahmad Ridwan',
        performedAt: new Date('2024-01-15'),
        nextMaintenanceDate: new Date('2024-07-15')
      }
    ],
    createdAt: new Date('2023-01-15'),
    updatedAt: new Date('2024-01-15')
  },
  {
    id: 'asset-002',
    name: 'Tangga Aluminium 3 Meter',
    category: 'Tools',
    code: 'TL-002',
    description: 'Tangga aluminium untuk instalasi tinggi',
    condition: 'good',
    status: 'borrowed',
    location: 'Gudang A - Rak 2',
    purchaseDate: new Date('2023-02-20'),
    purchasePrice: 850000,
    picId: 'user-003',
    picName: 'Budi Santoso',
    borrowedBy: {
      userId: 'user-004',
      userName: 'Siti Nurhaliza',
      borrowDate: new Date('2024-03-01'),
      expectedReturnDate: new Date('2024-03-15'),
      notes: 'Untuk instalasi di rumah pelanggan Jl. Merdeka'
    },
    maintenanceHistory: [],
    createdAt: new Date('2023-02-20'),
    updatedAt: new Date('2024-03-01')
  },
  {
    id: 'asset-003',
    name: 'Crimping Tool RJ45',
    category: 'Tools',
    code: 'TL-003',
    description: 'Tang crimping untuk konektor RJ45',
    condition: 'excellent',
    status: 'available',
    location: 'Gudang B - Rak 1',
    purchaseDate: new Date('2023-03-10'),
    purchasePrice: 250000,
    picId: 'user-002',
    picName: 'Ahmad Ridwan',
    maintenanceHistory: [],
    createdAt: new Date('2023-03-10'),
    updatedAt: new Date('2023-03-10')
  },
  {
    id: 'asset-004',
    name: 'Drill Beton Makita',
    category: 'Power Tools',
    code: 'PT-001',
    description: 'Drill beton untuk pembuatan lubang kabel',
    condition: 'good',
    status: 'maintenance',
    location: 'Workshop - Meja Repair',
    purchaseDate: new Date('2022-11-05'),
    purchasePrice: 1500000,
    picId: 'user-005',
    picName: 'Denny Kurniawan',
    maintenanceHistory: [
      {
        id: 'maint-002',
        assetId: 'asset-004',
        type: 'corrective',
        description: 'Perbaikan motor brush yang aus',
        cost: 200000,
        performedBy: 'Teknisi Service',
        performedAt: new Date('2024-02-28'),
        nextMaintenanceDate: new Date('2024-08-28')
      }
    ],
    createdAt: new Date('2022-11-05'),
    updatedAt: new Date('2024-02-28')
  },
  {
    id: 'asset-005',
    name: 'Cable Tester UTP',
    category: 'Testing Equipment',
    code: 'TE-001',
    description: 'Alat test kabel UTP dan koaksial',
    condition: 'excellent',
    status: 'available',
    location: 'Gudang B - Rak 3',
    purchaseDate: new Date('2023-05-12'),
    purchasePrice: 450000,
    picId: 'user-006',
    picName: 'Rina Sari',
    maintenanceHistory: [],
    createdAt: new Date('2023-05-12'),
    updatedAt: new Date('2023-05-12')
  },
  {
    id: 'asset-006',
    name: 'Generator Honda 2500W',
    category: 'Power Equipment',
    code: 'PE-001',
    description: 'Generator portable untuk instalasi di lokasi tanpa listrik',
    condition: 'good',
    status: 'available',
    location: 'Gudang C - Area Besar',
    purchaseDate: new Date('2022-08-15'),
    purchasePrice: 8500000,
    picId: 'user-007',
    picName: 'Agus Hermawan',
    maintenanceHistory: [
      {
        id: 'maint-003',
        assetId: 'asset-006',
        type: 'preventive',
        description: 'Ganti oli mesin dan filter udara',
        cost: 150000,
        performedBy: 'Agus Hermawan',
        performedAt: new Date('2024-01-20'),
        nextMaintenanceDate: new Date('2024-07-20')
      }
    ],
    createdAt: new Date('2022-08-15'),
    updatedAt: new Date('2024-01-20')
  },
  {
    id: 'asset-007',
    name: 'Safety Harness',
    category: 'Safety Equipment',
    code: 'SE-001',
    description: 'Sabuk pengaman untuk panjat tiang',
    condition: 'fair',
    status: 'borrowed',
    location: 'Gudang A - Rak Safety',
    purchaseDate: new Date('2023-01-30'),
    purchasePrice: 350000,
    picId: 'user-008',
    picName: 'Wahyu Prasetyo',
    borrowedBy: {
      userId: 'user-009',
      userName: 'Indra Gunawan',
      borrowDate: new Date('2024-03-05'),
      expectedReturnDate: new Date('2024-03-12'),
      notes: 'Pekerjaan maintenance tower BTS'
    },
    maintenanceHistory: [
      {
        id: 'maint-004',
        assetId: 'asset-007',
        type: 'inspection',
        description: 'Pemeriksaan kondisi tali dan gesper',
        cost: 0,
        performedBy: 'Safety Officer',
        performedAt: new Date('2024-02-01'),
        nextMaintenanceDate: new Date('2024-05-01')
      }
    ],
    createdAt: new Date('2023-01-30'),
    updatedAt: new Date('2024-03-05')
  }
];