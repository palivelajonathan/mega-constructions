/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Product } from '../types';

export const PRODUCTS: Product[] = [
  {
    id: 'rebar-bending',
    name: 'Rebar Bending Machine',
    category: 'rebar',
    tagline: 'High-Precision Gearbox Driven Rebar Bending',
    description: 'The Mega GW-42J Rebar Bending Machine is engineered for ultra-precise and efficient bending of steel reinforcement bars. It features a heavy-duty gearbox, high-grade bending plate, and digital brake motor for unparalleled consistency on large-scale infrastructure projects.',
    image: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&q=80&w=800',
    features: [
      'Heavy-duty industrial gearbox for maximum torque transmission',
      '3kW digital brake motor for instant stop-and-go precision',
      'Thickened 10mm working table plate to handle high impact loads',
      'Multiple bending bush/pin sizes included for versatile angle bends',
      'Dust-sealed internal mechanisms for continuous outdoor usage',
      'Foot-switch and manual controls for worker comfort and high output'
    ],
    specs: {
      model: 'Gw42 J',
      rebarDiameter: '6 - 32mm',
      bendingSpeed: '5 - 10 r / min',
      power: '3kW Brake Motor',
      voltage: '415V (3-Phase)',
      plateDiameter: '365mm',
      speed: '1430 r / min',
      drivingMode: 'Gear Box System',
      tableThickness: '10 mm',
      weight: '305 kg',
      dimensions: '940 x 760 x 870 mm'
    },
    applications: [
      'Precast concrete factories and yards',
      'Bridges, flyovers, and highway construction sites',
      'Metro rail and high-rise commercial structures',
      'Reinforcement bar processing plants'
    ],
    advantages: [
      'Extremely safe operation with integrated limit switches',
      'Low maintenance cycles due to high-torque oil bath gearbox',
      'Consistent angle precision (up to 180 degrees) without slippage',
      'Thick frame prevents flexing under maximum rebar diameters'
    ]
  },
  {
    id: 'rebar-cutting',
    name: 'Rebar Cutting Machine',
    category: 'rebar',
    tagline: 'High-Speed Shearing with Phase Loss Protection Relay',
    description: 'Built for steady, heavy-duty rebar shearing, the Mega GQ-40 Cutting Machine integrates a Phase Loss Preventer to protect the electric motor from power fluctuations. Equipped with heat-treated steel blades, it shears concrete reinforcement bars of up to 32mm reliably.',
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=800',
    features: [
      'Equipped with Phase Loss Preventer for ultimate motor safety',
      'High-speed operation delivering up to 32 cuts per minute',
      'Four-edged heavy alloy steel blades for prolonged service life',
      'Cast steel body layout avoiding cracking and structural wear',
      'Clutch-based trigger control for exact and safe cutting strokes',
      'Robust transport wheels for easy mobilization across the site'
    ],
    specs: {
      model: 'GQ40 with Phase Loss Preventer',
      rebarDiameter: '6 - 32mm',
      cuttingSpeed: '32 times / min',
      power: '3kW / 4.02 hp',
      voltage: '415V (3-Phase)',
      speed: '2880 rpm (Motor)',
      bladeSize: '83 x 83 x 25 mm',
      weight: '390 kg',
      dimensions: '1420 x 360 x 760 mm'
    },
    applications: [
      'Massive site infrastructure shearing requirements',
      'Rebar distribution centers and fabrication yards',
      'Industrial foundations and dam walls creation'
    ],
    advantages: [
      'Phase Loss Preventer prevents expensive burnouts in high-voltage sites',
      'Compact heavy-wheel layout fits in tight staging spaces',
      'High cutting-rate boosts overall steel preparation speed by 40%',
      'Universal blade profile allows quick rotation to utilize all four edges'
    ]
  },
  {
    id: 'concrete-mixer',
    name: 'Concrete Mixer (Heavy Duty)',
    category: 'concrete',
    tagline: 'Quality Mixing for Uniform Cement Blends',
    description: 'Mega concrete mixers are built to produce quality concrete and mortar mixtures. Utilizing steel drums, cast-iron gear rings, and powered by choice diesel engines or electric motors, these mixers ensure uniform blending with quick discharge capabilities.',
    image: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&q=80&w=800',
    features: [
      'Double-wheel hand tilt mechanism for perfectly metered discharge',
      'Heavy-duty cast iron ring gear with steel cover for operator safety',
      'Reinforced high-gauge sheet steel drum structure with anti-build blades',
      'Choice of premium diesel engines or copper-bound electric motors',
      'Sturdy heavy-channel steel chassis with shock-absorbing pneumatic tires',
      'Lockable cabin door for engine protection against theft and elements'
    ],
    specs: {
      model: 'MC-107 Heavy Duty Mixer',
      capacity: '10/7 CFT (approx. 1 bag capacity)',
      power: '5.0 HP Diesel Engine / 3.0 HP Electric Motor',
      voltage: '415V (for Electric Option)',
      speed: '18 - 22 rpm (Drum)',
      drivingMode: 'Gear and V-Belt System',
      weight: '480 kg',
      dimensions: '1850 x 1150 x 1400 mm'
    },
    applications: [
      'Residential foundations and framing castings',
      'Paving roadways, walkways, and drainage ducts',
      'Refurbishing civil infrastructure units'
    ],
    advantages: [
      'Thick steel drum base ensures double the wear resistance of cheaper models',
      'Optimized blade geometry cuts mixing times down to 90 seconds',
      'Towable high-speed chassis structure with rigid leaf-spring layout',
      'Sealed drum bearings reduce maintenance grease requirements'
    ]
  },
  {
    id: 'mini-crane',
    name: 'Industrial Mini Crane',
    category: 'lifting',
    tagline: 'Safe Material Shifting and Hoisting on Site',
    description: 'Designed specifically for multi-storey building construction, the Mega Mini Crane (Material Lift) provides a secure, practical method for hoisting cement buckets, brick boxes, and other materials. Features 360-degree rotation with mechanical brakes.',
    image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=800',
    features: [
      'Full 360-degree rotation axis for easy loading and unloading at height',
      'Heavy-gauge high-tensile steel wire rope with dual weight capacities',
      'Automatic self-locking mechanical brakes for crash protection',
      'Detachable structural frame for fast assembly and transport to rooftops',
      'Robust weighted structural base with tie-down anchoring provisions',
      'Includes high-capacity metal hopper/bucket for concrete or mortar lifting'
    ],
    specs: {
      model: 'MMC-500 Material Hoist',
      capacity: '300 kg - 500 kg',
      power: '3 HP Electric Motor (Brake) / 5 HP Diesel Engine',
      voltage: '415V (for Electric Option)',
      speed: '25 meters / min lifting speed',
      drivingMode: 'Friction Clutch and Drum Reel',
      weight: '260 kg (excluding counterweights)',
      dimensions: 'Boom Length: 1.8m, Mast Height: 2.1m'
    },
    applications: [
      'Multi-storey commercial building rooftops',
      'Restoration of facades and high-rise structures',
      'Transporting bricks, mortar, steel studs, and tiles'
    ],
    advantages: [
      'Extremely quick setup (under 45 minutes) on building slabs',
      'Smooth friction-clutch operation reduces jerks during load hoisting',
      'Saves high labor costs and speeds up floor deck pouring operations',
      'Safety limit switch limits rope overwind risks'
    ]
  },
  {
    id: 'construction-hoist',
    name: 'Heavy Duty Construction Hoist',
    category: 'lifting',
    tagline: 'Vertical Transport Lifter for Materials and Tools',
    description: 'A robust vertical transport tower solution, suitable for medium and high-rise building sites. Featuring rack-and-pinion transmission and modular steel mast elements, this system hoists building assets and materials safely.',
    image: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&q=80&w=800',
    features: [
      'Dual electronic safety locks on cabin doors',
      'Modular lattice mast structures for height flexibility',
      'Overspeed governor safety system with drop arrest brake',
      'Waterproof control panels at every boarding station'
    ],
    specs: {
      model: 'MCH-1000 Tower Lifter',
      capacity: '1000 kg',
      power: '11 kW x 2 Motors',
      voltage: '415V (3-Phase)',
      speed: '33 meters / min',
      drivingMode: 'Rack and Pinion Gear Drive',
      weight: '1100 kg (Basic Station)',
      dimensions: 'Cabin: 2.0 x 1.5 x 2.2 m'
    },
    applications: [
      'Skyline construction and structural glazing',
      'Hoisting columns, panels, and large masonry pallets'
    ],
    advantages: [
      'Dramatically reduces personnel transit times up high tower projects',
      'Rack-and-pinion setup offers zero slippage compared to wire-ropes',
      'Weather-shielded power cables protect the system during heavy rains'
    ]
  },
  {
    id: 'concrete-vibrator',
    name: 'Concrete Vibrator & Needle Shaft',
    category: 'concrete',
    tagline: 'Reliable Compaction for Quality Concrete Slabs',
    description: 'A portable mechanical vibrator set to help eliminate air pockets inside poured concrete. Offered with electric or petrol motor frames, coupled with durable flexible shafts and steel needles.',
    image: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&q=80&w=800',
    features: [
      'Reinforced flexible drive casing with wire mesh armor',
      'Vibrator needle tip hardened for maximum abrasion resistance',
      'Easy quick-action coupler for changing shafts on the fly',
      'Sturdy protective tubular cage frame with vibration isolators'
    ],
    specs: {
      model: 'MCV-200 Vibrator Engine',
      capacity: 'Compaction Depth up to 600mm',
      power: '2.0 HP Electric Motor / 5.5 HP Petrol Engine',
      voltage: '220V or 415V (Electric)',
      speed: '9500 - 12000 vibrations / min',
      drivingMode: 'Direct Flex Drive Shaft',
      weight: '24 kg (Engine + Frame)',
      dimensions: 'Needle Sizes: 40mm, 50mm, 60mm; Shaft: 4m, 6m'
    },
    applications: [
      'Pouring reinforced pillars, slabs, beams, and precast pipes',
      'Retaining wall casting and foundation plinths'
    ],
    advantages: [
      'Eliminates honeycombing and structural voids inside rebar nets',
      'Double bearings inside the needle double the active service lifespan',
      'Ultra-reliable petrol engine runs where electrical grid drops are frequent'
    ]
  },
  {
    id: 'spare-parts',
    name: 'Industrial Machinery Spares',
    category: 'spares',
    tagline: 'Original Spare Parts for Maintenance and Support',
    description: 'Mega is a trusted local stockist for concrete mixer gear rings, rebar bender pins, shear blades, clutches, transmission gears, carbon brushes, and spare motors, helping your machines operate with minimal downtime.',
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=800',
    features: [
      'Original replacement parts manufactured with exact metallurgy tolerances',
      'Heavy alloy steel blades for rebar cutters with multiple cutting life edges',
      'Premium brass and copper parts for high electrical loads',
      'Huge warehouse stock in Hyderabad Moula-Ali for immediate pickup/delivery'
    ],
    specs: {
      model: 'Mega-OEM Replacement Range',
      power: 'N/A (Various component grades)',
      voltage: 'N/A',
      drivingMode: 'Direct Replacement design',
      weight: '0.1 kg - 80 kg (Individual Spares)',
      dimensions: 'Tailored for standard Indian and Global machinery brands'
    },
    applications: [
      'Daily repair of on-site mixer mechanisms',
      'Upgrading rebar benders and shears in central yards',
      'Preventative monthly servicing of concrete handling fleets'
    ],
    advantages: [
      'Exact OEM specifications for reliable installation and matching',
      'Helps reduce machinery friction wear, maintaining normal fuel/energy draw',
      'Competitive pricing directly from our Hyderabad workshop'
    ]
  }
];

export const STATISTICS = {
  yearsExperience: 18,
  happyClients: 150,
  machinesDelivered: 500,
  projectsCompleted: 150,
};

export const REVIEWS = [
  {
    id: '1',
    name: 'Rajesh K. Reddy',
    designation: 'Managing Director',
    company: 'Sree Venkateshwara Infra Projects',
    comment: 'Mega Construction Equipments has been our primary machinery supplier for over 8 years. Their GW-42J Rebar Bending machine is incredibly robust. Excellent after-sales service and genuine spares available immediately.',
    rating: 5,
  },
  {
    id: '2',
    name: 'Anirudh Naidu',
    designation: 'Senior Procurement Manager',
    company: 'Telangana Housing Board Projects',
    comment: 'The GQ-40 Cutting Machines we rented from Venkat Rao Garu performed flawlessly during our massive 24/7 housing casting cycle. The built-in phase protection saved us from twice the motor failures under voltage drops.',
    rating: 5,
  },
  {
    id: '3',
    name: 'Meenakshi Sundaram',
    designation: 'Operations Lead',
    company: 'Southway Bridges & Flyovers Ltd',
    comment: 'Genuine industrial quality, competitive pricing, and immediate dispatch. Their concrete mixer construction is clearly using higher-gauge steel sheets compared to local fabricators. Highly recommended!',
    rating: 5,
  }
];

export const FAQS = [
  {
    id: 'faq-1',
    question: 'Where is the assembly workshop and yard of Mega Construction Equipments located?',
    answer: 'Our assembly workshop and sales yard are located at #5-12-193, Mangapuram Colony, Moula-Ali, Hyderabad, Telangana, 500040. Contractors and site managers are welcome to visit our yard for live machinery trials.'
  },
  {
    id: 'faq-2',
    question: 'Do you offer machinery rentals for short-term infrastructure projects?',
    answer: 'Yes! We run an extensive construction equipment rental division. Rebar benders, cutting shear units, mini cranes, and heavy concrete mixers are available for lease on daily, weekly, or monthly tenures.'
  },
  {
    id: 'faq-3',
    question: 'How does the Phase Loss Preventer in your Rebar Cutting Machine work?',
    answer: 'Our GQ-40 Cutting Machine incorporates an advanced safety relay called a Phase Loss Preventer. If a site power line fails or undergoes a massive brownout, the sensor immediately trips the electric input, protecting the 3kW high-torque copper motor from single-phasing burnouts.'
  },
  {
    id: 'faq-4',
    question: 'Can I purchase authentic spare parts directly from your Moula-Ali yard?',
    answer: 'Absolutely. Under Mega Service & Spares, we are the direct suppliers and stockists for all essential heavy gear rings, friction clutches, high-durability alloy cutter blades, V-belts, and specialized brake motor parts. You can get spares shipped instantly to your site.'
  },
  {
    id: 'faq-5',
    question: 'What warranties and service guarantees do you offer on new purchases?',
    answer: 'All new Mega machinery is backed by a 1-year structural and powertrain warranty. We deploy our experienced service technicians directly to your site within 24 hours of any operational log inside Telangana and Andhra Pradesh.'
  }
];
