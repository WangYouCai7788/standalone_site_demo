export const categories = [
  { id: 'all', name: 'All Products', nameCn: '全部产品' },
  { id: 'audio', name: 'Audio', nameCn: '音频' },
  { id: 'charging', name: 'Charging', nameCn: '充电' },
  { id: 'accessories', name: 'Accessories', nameCn: '配件' }
]

export const products = [
  {
    id: 1,
    category: 'audio',
    name: 'TWS Bluetooth Earbuds Pro',
    nameCn: '真无线蓝牙耳机 Pro',
    image: 'https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?w=600&h=600&fit=crop',
    description: 'Premium quality TWS earbuds with active noise cancellation, 30hr battery life, IPX5 waterproof, Bluetooth 5.3.',
    descriptionCn: '高品质真无线耳机，主动降噪，30小时续航，IPX5防水，蓝牙5.3。',
    features: ['Bluetooth 5.3', 'ANC Noise Cancelling', '30hr Battery Life', 'IPX5 Waterproof', 'Touch Control', 'USB-C Charging'],
    fobPrice: '$8.50 - $12.00',
    moq: 500,
    moqUnit: 'pairs',
    moqUnitCn: '对',
    specs: {
      'Driver': '13mm Dynamic',
      'Battery (Earbuds)': '45mAh',
      'Battery (Case)': '500mAh',
      'Charging Time': '1.5hr',
      'Color Options': 'Black / White / Blue'
    }
  },
  {
    id: 2,
    category: 'charging',
    name: '10000mAh Power Bank PD 20W',
    nameCn: '10000mAh 快充移动电源',
    image: 'https://images.unsplash.com/photo-1609592424743-395b2957a01c?w=600&h=600&fit=crop',
    description: 'Ultra-slim portable charger with 20W PD fast charging, dual input/output, LED indicator. Safety certified.',
    descriptionCn: '超薄便携充电宝，20W PD快充，双输入输出，LED电量显示，安全认证。',
    features: ['20W PD Fast Charging', '10000mAh Capacity', 'Ultra-slim Design', 'Dual USB Output', 'LED Indicator', 'CE/FCC/ROHS'],
    fobPrice: '$6.80 - $9.50',
    moq: 300,
    moqUnit: 'pcs',
    moqUnitCn: '个',
    specs: {
      'Capacity': '10000mAh / 37Wh',
      'Input': 'Type-C 18W',
      'Output 1': 'USB-A 22.5W',
      'Output 2': 'Type-C 20W PD',
      'Weight': '195g',
      'Material': 'ABS + PC'
    }
  },
  {
    id: 3,
    category: 'audio',
    name: 'Portable Bluetooth Speaker',
    nameCn: '便携蓝牙音箱',
    image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=600&h=600&fit=crop',
    description: 'Waterproof outdoor speaker with 360° surround sound, 20hr playtime, TF card support, TWS pairing.',
    descriptionCn: '防水户外音箱，360°环绕立体声，20小时播放，支持TF卡，TWS串联。',
    features: ['360° Surround Sound', 'IPX7 Waterproof', '20hr Playtime', 'TWS Pairing', 'TF Card Support', 'Built-in Mic'],
    fobPrice: '$10.00 - $15.00',
    moq: 500,
    moqUnit: 'pcs',
    moqUnitCn: '个',
    specs: {
      'Output Power': '20W',
      'Driver': '52mm x 2',
      'Battery': '3600mAh',
      'Bluetooth': '5.0',
      'Waterproof': 'IPX7',
      'Size': '188 x 68 x 68mm'
    }
  },
  {
    id: 4,
    category: 'charging',
    name: '65W GaN Fast Charger',
    nameCn: '65W GaN 氮化镓快充头',
    image: 'https://images.unsplash.com/photo-1642204521964-195fc8bd7a33?w=600&h=600&fit=crop',
    description: 'Compact GaN technology charger with 3 ports (2x Type-C + 1x USB-A). Compatible with laptops, tablets, phones.',
    descriptionCn: '紧凑型氮化镓充电器，三端口（2C+1A），兼容笔记本、平板、手机。',
    features: ['65W GaN Technology', '3 Ports (2C+1A)', 'PD 3.0 / QC 4.0+', 'Foldable Plug', 'Wide Voltage 100-240V', 'CE/FCC Certified'],
    fobPrice: '$9.00 - $13.00',
    moq: 500,
    moqUnit: 'pcs',
    moqUnitCn: '个',
    specs: {
      'Total Output': '65W Max',
      'Type-C1': '65W PD',
      'Type-C2': '65W PD',
      'USB-A': '22.5W QC',
      'Input': '100-240V 50/60Hz',
      'Size': '55 x 55 x 30mm'
    }
  },
  {
    id: 5,
    category: 'accessories',
    name: 'Premium Silicone Phone Case',
    nameCn: '高级硅胶手机壳',
    image: 'https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=600&h=600&fit=crop',
    description: 'Liquid silicone phone case with soft touch, full camera protection, 2mm raised bezel. Custom logo available.',
    descriptionCn: '液态硅胶手机壳，亲肤手感，全包镜头保护，2mm边框凸起，可定制LOGO。',
    features: ['Liquid Silicone Material', 'Soft Touch Finish', 'Full Camera Protection', '2mm Raised Bezel', 'Custom Logo', 'Multiple Colors'],
    fobPrice: '$1.80 - $3.50',
    moq: 1000,
    moqUnit: 'pcs',
    moqUnitCn: '个',
    specs: {
      'Material': 'Liquid Silicone',
      'Models': 'iPhone/Samsung/Xiaomi',
      'Colors': '12 Standard Colors',
      'Custom Logo': 'Screen Print / Emboss',
      'Sample Time': '5-7 Days',
      'Packaging': 'Bulk / Retail Box'
    }
  },
  {
    id: 6,
    category: 'accessories',
    name: '10-in-1 USB-C Hub Adapter',
    nameCn: '10合1 Type-C 扩展坞',
    image: 'https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?w=600&h=600&fit=crop',
    description: 'Multi-port USB-C hub with 4K HDMI, 100W PD pass-through, SD/TF reader, Gigabit Ethernet, 3x USB 3.0.',
    descriptionCn: '多端口Type-C扩展坞，4K HDMI，100W PD直通，SD/TF读卡，千兆网口，3个USB 3.0。',
    features: ['4K@60Hz HDMI Output', '100W PD Pass-through', 'Gigabit Ethernet', 'SD/TF Card Reader', '3x USB 3.0', 'Aluminum Shell'],
    fobPrice: '$12.00 - $18.00',
    moq: 300,
    moqUnit: 'pcs',
    moqUnitCn: '个',
    specs: {
      'HDMI': '4K@60Hz',
      'PD Charging': 'Up to 100W',
      'USB 3.0': '5Gbps x 3',
      'Ethernet': '1000Mbps',
      'Material': 'Aluminum Alloy',
      'Cable Length': '15cm'
    }
  },
  {
    id: 7,
    category: 'charging',
    name: '15W Fast Wireless Charger',
    nameCn: '15W 无线快充',
    image: 'https://images.unsplash.com/photo-1622037022824-0c71d511ef3c?w=600&h=600&fit=crop',
    description: 'Fast wireless charging pad with cooling fan, LED indicator, foreign object detection. Compatible with all Qi devices.',
    descriptionCn: '无线快充底座，带散热风扇，LED指示灯，异物检测，兼容所有Qi设备。',
    features: ['15W Fast Charging', 'Qi Standard Compatible', 'Cooling Fan', 'Foreign Object Detection', 'LED Indicator', 'Anti-slip Base'],
    fobPrice: '$4.50 - $7.00',
    moq: 500,
    moqUnit: 'pcs',
    moqUnitCn: '个',
    specs: {
      'Input': '5V/2A or 9V/2A',
      'Output': '5W/7.5W/10W/15W',
      'Efficiency': '≥ 75%',
      'Distance': '≤ 8mm',
      'Size': '98 x 98 x 8mm',
      'Color': 'Black / White'
    }
  },
  {
    id: 8,
    category: 'audio',
    name: 'USB-C Wired Earphones',
    nameCn: 'Type-C 有线耳机',
    image: 'https://images.unsplash.com/photo-1599666410425-1b06f2e20b92?w=600&h=600&fit=crop',
    description: 'High-fidelity USB-C earphones with in-line mic, tangle-free cable, 10mm dynamic driver. DAC built-in.',
    descriptionCn: '高保真Type-C耳机，内置麦克风，防缠绕线材，10mm动圈单元，内置DAC解码。',
    features: ['Built-in DAC Chip', '10mm Dynamic Driver', 'In-line Remote & Mic', 'Tangle-free Cable', 'Aluminum Housing', 'Hi-Res Audio'],
    fobPrice: '$2.50 - $4.50',
    moq: 1000,
    moqUnit: 'pcs',
    moqUnitCn: '条',
    specs: {
      'Driver': '10mm Dynamic',
      'Impedance': '32Ω',
      'Frequency': '20Hz-20kHz',
      'Mic': 'Built-in',
      'Cable Length': '1.2m',
      'Connector': 'USB-C'
    }
  }
]

export function getProductById(id) {
  return products.find(p => p.id === Number(id))
}

export function getProductsByCategory(categoryId) {
  if (!categoryId || categoryId === 'all') return products
  return products.filter(p => p.category === categoryId)
}
