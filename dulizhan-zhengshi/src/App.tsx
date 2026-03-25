/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, AnimatePresence } from "motion/react";
import { 
  ShieldCheck, 
  Globe, 
  Factory, 
  ArrowRight, 
  HardHat, 
  Settings, 
  Truck, 
  Menu, 
  X,
  Phone,
  Mail,
  MapPin,
  Layers,
  Container,
  Zap,
  Droplets,
  Flame,
  Activity,
  ChevronRight,
  CheckCircle2
} from "lucide-react";
import { useState } from "react";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed w-full z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          <div className="flex items-center gap-3">
            <div className="bg-orange-600 p-2 rounded-lg">
              <Factory className="text-white w-6 h-6" />
            </div>
            <div className="flex flex-col leading-none">
              <span className="text-2xl font-black tracking-tighter text-slate-900 uppercase italic">Titan<span className="text-orange-600">Source</span></span>
              <span className="text-[9px] font-bold text-slate-500 tracking-[0.4em] uppercase">Manufacturing Group</span>
            </div>
          </div>
          
          <div className="hidden lg:flex items-center gap-10">
            <a href="#matrix" className="text-[11px] font-bold uppercase tracking-[0.15em] text-slate-600 hover:text-orange-600 transition-colors">Technical Matrix</a>
            <a href="#oem" className="text-[11px] font-bold uppercase tracking-[0.15em] text-slate-600 hover:text-orange-600 transition-colors">OEM Solutions</a>
            <a href="#factory" className="text-[11px] font-bold uppercase tracking-[0.15em] text-slate-600 hover:text-orange-600 transition-colors">Infrastructure</a>
            <a href="#contact" className="bg-slate-900 text-white px-8 py-3 rounded-full text-[11px] font-bold uppercase tracking-[0.15em] hover:bg-orange-600 transition-all shadow-lg shadow-slate-900/10">
              Wholesale Inquiry
            </a>
          </div>

          <div className="lg:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-slate-900 p-2">
              {isOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="lg:hidden bg-white border-b border-slate-200 px-4 py-8 space-y-6"
        >
          <a href="#matrix" className="block text-xs font-bold uppercase tracking-widest text-slate-900">Technical Matrix</a>
          <a href="#oem" className="block text-xs font-bold uppercase tracking-widest text-slate-900">OEM Solutions</a>
          <a href="#factory" className="block text-xs font-bold uppercase tracking-widest text-slate-900">Infrastructure</a>
          <a href="#contact" className="block w-full bg-orange-600 text-white text-center py-4 rounded-lg font-bold uppercase tracking-widest">Wholesale Inquiry</a>
        </motion.div>
      )}
    </nav>
  );
};

const Hero = () => {
  return (
    <section className="relative min-h-[90vh] flex items-stretch bg-slate-900 overflow-hidden pt-20">
      {/* Background Decorative Grid - Full Screen */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }} />
      </div>

      <div className="flex flex-col lg:flex-row w-full items-stretch">
        
        {/* Left: Content Area - Expands to edge */}
        <div className="lg:w-1/2 p-12 lg:p-24 xl:p-32 flex flex-col justify-center bg-slate-900 relative z-10">
          <div className="max-w-xl ml-auto w-full">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-1 bg-orange-600" />
              <span className="text-[10px] font-black text-orange-500 uppercase tracking-[0.5em]">Direct Manufacturing Hub</span>
            </div>
            
            <h1 className="text-6xl lg:text-7xl xl:text-8xl font-black text-white uppercase tracking-tighter leading-[0.85] mb-10 italic">
              5 Million Pairs <br />
              <span className="text-orange-600">Annual Capacity.</span>
            </h1>
            
            <p className="text-slate-400 text-lg mb-12 leading-relaxed max-w-md font-medium">
              Your reliable global OEM/ODM partner. Precision-engineered safety footwear built for international industrial standards.
            </p>

            <div className="flex flex-wrap gap-6 mb-16">
              <a href="#contact" className="bg-orange-600 text-white px-10 py-5 font-black text-xs uppercase tracking-[0.2em] hover:bg-white hover:text-slate-900 transition-all shadow-2xl">
                Request Custom Sample
              </a>
              <button className="border border-white/20 text-white px-10 py-5 font-black text-xs uppercase tracking-[0.2em] hover:bg-white/10 transition-all flex items-center gap-3">
                Download Catalog <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Micro Stats */}
            <div className="grid grid-cols-3 gap-8 pt-12 border-t border-white/10">
              <div>
                <div className="text-2xl font-black text-white italic">20+</div>
                <div className="text-[8px] text-slate-500 font-bold uppercase tracking-widest">Years Experience</div>
              </div>
              <div>
                <div className="text-2xl font-black text-white italic">12</div>
                <div className="text-[8px] text-slate-500 font-bold uppercase tracking-widest">Production Lines</div>
              </div>
              <div>
                <div className="text-2xl font-black text-white italic">100%</div>
                <div className="text-[8px] text-slate-500 font-bold uppercase tracking-widest">QC Inspection</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Visual Area - Expands to edge */}
        <div className="lg:w-1/2 relative min-h-[500px] lg:min-h-full overflow-hidden group">
          <img 
            src="https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&q=80&w=2070" 
            alt="Factory Excellence" 
            className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 scale-105 group-hover:scale-100"
            referrerPolicy="no-referrer"
          />
          {/* Overlay for depth */}
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-transparent to-transparent lg:block hidden" />
          <div className="absolute inset-0 bg-orange-600/10 mix-blend-multiply" />
          
          {/* Play Button Placeholder */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-24 h-24 rounded-full border border-white/30 flex items-center justify-center backdrop-blur-sm group-hover:scale-110 transition-transform duration-500 cursor-pointer">
              <div className="w-0 h-0 border-t-[10px] border-t-transparent border-l-[18px] border-l-white border-b-[10px] border-b-transparent ml-2" />
            </div>
          </div>

          {/* Floating Badge */}
          <div className="absolute bottom-10 right-10 bg-white p-6 hidden xl:block">
            <div className="text-slate-900 font-black text-xl tracking-tighter italic leading-none mb-1 uppercase">Certified Factory</div>
            <div className="text-[8px] text-orange-600 font-black uppercase tracking-[0.2em]">ISO 9001 // BSCI AUDITED</div>
          </div>
        </div>

      </div>
    </section>
  );
};

const ManufacturingExcellence = () => {
  const stats = [
    { label: "Automated Lines", value: "12", icon: <Settings className="w-5 h-5" /> },
    { label: "R&D Engineers", value: "45+", icon: <Layers className="w-5 h-5" /> },
    { label: "Annual Output", value: "5M+", icon: <Activity className="w-5 h-5" /> },
    { label: "Export Regions", value: "50+", icon: <Globe className="w-5 h-5" /> }
  ];

  return (
    <section id="factory" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          
          {/* Left: Factory Narrative */}
          <div className="order-2 lg:order-1">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-1 bg-orange-600" />
              <h2 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.5em]">Manufacturing Power</h2>
            </div>
            <h3 className="text-6xl font-black text-slate-900 uppercase tracking-tighter leading-[0.85] mb-10 italic">
              Precision <br />
              <span className="text-orange-600">Engineering.</span>
            </h3>
            
            <div className="space-y-6 text-slate-600 text-lg leading-relaxed mb-12">
              <p>
                With over two decades of specialized experience in safety footwear, our manufacturing facility stands as a benchmark of industrial excellence. We don't just assemble shoes; we engineer protection.
              </p>
              <p className="text-sm font-medium text-slate-500">
                Our 12 fully automated production lines integrate the latest injection technology and robotic precision, ensuring that every pair meets the exact specifications required for high-risk industrial environments. From material sourcing to final stress testing, our in-house laboratory monitors every stage of the lifecycle.
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-8">
              {stats.map((stat, i) => (
                <div key={i} className="border-l-2 border-slate-100 pl-6 py-1 hover:border-orange-600 transition-colors group">
                  <div className="text-2xl font-black text-slate-900 italic">{stat.value}</div>
                  <div className="text-[9px] text-slate-400 font-bold uppercase tracking-widest">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Framed Factory Image */}
          <div className="order-1 lg:order-2 relative">
            <div className="aspect-[4/5] bg-slate-100 overflow-hidden border-[16px] border-slate-50 shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=2070" 
                alt="Advanced Production Facility" 
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000"
                referrerPolicy="no-referrer"
              />
            </div>
            {/* Floating Badge */}
            <div className="absolute -bottom-6 -left-6 bg-slate-900 p-8 text-white shadow-2xl hidden xl:block">
              <div className="text-4xl font-black italic text-orange-600 mb-1">24/7</div>
              <div className="text-[9px] font-black uppercase tracking-widest text-slate-400">Continuous Production</div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

const GlobalCompliance = () => {
  const certifications = [
    { name: "ASTM F2413", desc: "US Standard", detail: "Impact & Compression resistance testing." },
    { name: "CE EN 20345", desc: "EU Certified", detail: "Full S1P/S3 certification for Europe." },
    { name: "ISO 9001", desc: "Quality Mgmt", detail: "International manufacturing quality control." },
    { name: "UKCA", desc: "UK Compliance", detail: "Post-Brexit market access for UK." },
  ];

  return (
    <section className="bg-slate-50 py-24 border-y border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="flex justify-center items-center gap-4 mb-6">
            <div className="w-8 h-px bg-slate-300" />
            <h2 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.5em]">Global Compliance</h2>
            <div className="w-8 h-px bg-slate-300" />
          </div>
          <h3 className="text-5xl font-black text-slate-900 uppercase tracking-tighter italic">
            Certified <span className="text-orange-600">Authority.</span>
          </h3>
        </div>

        <div className="grid md:grid-cols-4 gap-8">
          {certifications.map((cert, i) => (
            <div key={i} className="bg-white p-8 border-t-4 border-slate-100 hover:border-orange-600 transition-all shadow-sm hover:shadow-xl group">
              <div className="text-xl font-black text-slate-900 mb-2 tracking-tighter uppercase italic">{cert.name}</div>
              <div className="text-[9px] font-black text-orange-600 uppercase tracking-widest mb-4">{cert.desc}</div>
              <p className="text-[11px] text-slate-400 leading-relaxed mb-6">{cert.detail}</p>
              <div className="flex items-center gap-2 text-[8px] font-bold text-slate-300 uppercase tracking-widest">
                <CheckCircle2 className="w-3 h-3 text-green-500" /> Original Document Verified
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const TechnicalMatrix = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedProduct, setSelectedProduct] = useState<any>(null);

  const categories = [
    { id: "all", label: "All", icon: <Globe className="w-3 h-3" /> },
    { id: "steel", label: "Steel", icon: <ShieldCheck className="w-3 h-3" /> },
    { id: "composite", label: "Composite", icon: <Zap className="w-3 h-3" /> },
    { id: "specialty", label: "Specialty", icon: <Flame className="w-3 h-3" /> }
  ];

  const products = [
    {
      id: "TS-X100",
      name: "Titan Steel Pro",
      category: "steel",
      isFlagship: true,
      image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&q=80&w=1974",
      gallery: [
        "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&q=80&w=1974",
        "https://images.unsplash.com/photo-1560769629-975ec94e6a86?auto=format&fit=crop&q=80&w=1964",
        "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?auto=format&fit=crop&q=80&w=1964"
      ],
      features: ["Steel Toe", "Anti-Puncture"],
      compliance: "ASTM / EN S3",
      techTags: ["S3", "HRO"],
      description: "Our flagship heavy-duty model with reinforced carbon steel. Engineered for high-impact industrial zones where maximum protection is non-negotiable. The Titan series represents a decade of material science innovation.",
      specs: {
        toe: "200J Carbon Steel",
        midsole: "Anti-Puncture Steel Plate",
        sole: "Dual-Density PU/Rubber",
        upper: "Full Grain Buffalo Leather",
        lining: "Breathable Sandwich Mesh"
      }
    },
    {
      id: "TS-A250",
      name: "Aero-Lite",
      category: "composite",
      image: "https://images.unsplash.com/photo-1560769629-975ec94e6a86?auto=format&fit=crop&q=80&w=1964",
      gallery: [
        "https://images.unsplash.com/photo-1560769629-975ec94e6a86?auto=format&fit=crop&q=80&w=1964",
        "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&q=80&w=1974"
      ],
      features: ["ESD Safe"],
      compliance: "EN S1P",
      techTags: ["S1P", "ESD"],
      description: "Ultra-lightweight composite toe safety shoe. Perfect for electronics manufacturing and logistics where metal-free construction is required.",
      specs: {
        toe: "Composite Fiber (Metal Free)",
        midsole: "Kevlar Anti-Puncture",
        sole: "Lightweight MD/Rubber",
        upper: "Microfiber / Fly-knit",
        lining: "Cool-Max Moisture Wicking"
      }
    },
    {
      id: "TS-W500",
      name: "Aqua-Shield",
      category: "specialty",
      image: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?auto=format&fit=crop&q=80&w=1964",
      gallery: [
        "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?auto=format&fit=crop&q=80&w=1964",
        "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=2070"
      ],
      features: ["Waterproof"],
      compliance: "EN S3 WR",
      techTags: ["S3", "WR"],
      description: "Fully waterproof safety boot designed for outdoor construction and wet environments. Features a breathable waterproof membrane.",
      specs: {
        toe: "Steel Toe Cap",
        midsole: "Steel Plate",
        sole: "Oil-Resistant Rubber",
        upper: "Waterproof Treated Leather",
        lining: "SympaTex Membrane"
      }
    },
    {
      id: "TS-H800",
      name: "Vulcan Master",
      category: "specialty",
      image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=2070",
      gallery: [
        "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=2070",
        "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&q=80&w=1974"
      ],
      features: ["Heat Resistant"],
      compliance: "EN S3 HRO",
      techTags: ["S3", "HRO"],
      description: "High-heat resistant safety footwear capable of withstanding 300°C contact heat. Ideal for smelting and heavy metal industries.",
      specs: {
        toe: "Steel Toe Cap",
        midsole: "Steel Plate",
        sole: "300°C HRO Rubber",
        upper: "Heat-Resistant Leather",
        lining: "Fire-Retardant Fabric"
      }
    },
    {
      id: "TS-M300",
      name: "Mining Titan",
      category: "steel",
      image: "https://images.unsplash.com/photo-1539185441755-769473a23570?auto=format&fit=crop&q=80&w=2071",
      gallery: [
        "https://images.unsplash.com/photo-1539185441755-769473a23570?auto=format&fit=crop&q=80&w=2071"
      ],
      features: ["Metatarsal"],
      compliance: "ASTM M/I/C",
      techTags: ["MT", "EH"],
      description: "Heavy-duty mining boot with integrated metatarsal protection. Built for the harshest underground conditions.",
      specs: {
        toe: "Steel Toe Cap",
        midsole: "Steel Plate",
        sole: "Deep-Lug Rubber",
        upper: "Heavy-Duty Leather",
        lining: "Abrasion Resistant Mesh"
      }
    },
    {
      id: "TS-L150",
      name: "Logistics Flex",
      category: "composite",
      image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&q=80&w=2012",
      gallery: [
        "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&q=80&w=2012"
      ],
      features: ["Lightweight"],
      compliance: "EN S1",
      techTags: ["S1", "SRC"],
      description: "Flexible and breathable safety sneaker for warehouse and logistics professionals. Combines athletic comfort with industrial safety.",
      specs: {
        toe: "Composite Toe",
        midsole: "Kevlar Plate",
        sole: "High-Flex PU",
        upper: "Breathable Mesh",
        lining: "Soft Textile"
      }
    },
    {
      id: "TS-C400",
      name: "Chem-Pro",
      category: "specialty",
      image: "https://images.unsplash.com/photo-1512374382149-4332c6c021f1?auto=format&fit=crop&q=80&w=1924",
      gallery: [
        "https://images.unsplash.com/photo-1512374382149-4332c6c021f1?auto=format&fit=crop&q=80&w=1924"
      ],
      features: ["Acid Resistant"],
      compliance: "EN S3 FO",
      techTags: ["S3", "FO"],
      description: "Chemical resistant safety footwear with specialized coating to protect against acids, oils, and industrial solvents.",
      specs: {
        toe: "Steel Toe Cap",
        midsole: "Steel Plate",
        sole: "Nitrile Rubber",
        upper: "Chemical-Resistant Leather",
        lining: "Acid-Resistant Mesh"
      }
    }
  ];

  const filteredProducts = activeCategory === "all" 
    ? products 
    : products.filter(p => p.category === activeCategory);

  const flagship = products.find(p => p.isFlagship);
  const gridItems = filteredProducts.filter(p => !p.isFlagship || activeCategory !== "all");

  // Navigation Logic
  const handleNext = () => {
    const currentIndex = products.findIndex(p => p.id === selectedProduct.id);
    const nextIndex = (currentIndex + 1) % products.length;
    setSelectedProduct(products[nextIndex]);
    setCurrentImageIndex(0);
  };

  const handlePrev = () => {
    const currentIndex = products.findIndex(p => p.id === selectedProduct.id);
    const prevIndex = (currentIndex - 1 + products.length) % products.length;
    setSelectedProduct(products[prevIndex]);
    setCurrentImageIndex(0);
  };

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  return (
    <section id="matrix" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Compact Header */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-16 pb-8 border-b border-slate-100 gap-8">
          <div className="flex items-center gap-6">
            <h3 className="text-4xl font-black text-slate-900 uppercase tracking-tighter italic">
              Technical <span className="text-orange-600">Matrix.</span>
            </h3>
            <div className="hidden md:block h-8 w-px bg-slate-200" />
            <p className="hidden md:block text-[10px] font-bold text-slate-400 uppercase tracking-widest max-w-[200px] leading-tight">
              Precision engineered safety solutions for global industry.
            </p>
          </div>
          
          {/* Ultra Compact Filter */}
          <div className="flex bg-slate-50 p-1 border border-slate-200">
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`flex items-center gap-2 px-5 py-2 text-[9px] font-black uppercase tracking-widest transition-all ${
                  activeCategory === cat.id 
                    ? "bg-slate-900 text-white shadow-lg" 
                    : "text-slate-400 hover:text-slate-600"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Unified Bento Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* Flagship - 2 Columns Wide */}
          {activeCategory === "all" && flagship && (
            <div 
              onClick={() => setSelectedProduct(flagship)}
              className="lg:col-span-2 bg-slate-900 group relative flex flex-col sm:flex-row overflow-hidden cursor-pointer"
            >
              <div className="sm:w-1/2 relative overflow-hidden">
                <img 
                  src={flagship.image} 
                  alt={flagship.name} 
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-4 left-4 bg-orange-600 text-white px-3 py-1 text-[8px] font-black uppercase tracking-widest italic">
                  Flagship
                </div>
              </div>
              <div className="sm:w-1/2 p-8 flex flex-col justify-center">
                <h4 className="text-2xl font-black text-white uppercase tracking-tighter italic mb-3">{flagship.name}</h4>
                <p className="text-slate-400 text-[11px] mb-6 leading-relaxed font-medium line-clamp-2">
                  {flagship.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {flagship.techTags.map((tag, i) => (
                    <span key={i} className="px-2 py-0.5 bg-white/10 text-white text-[8px] font-black uppercase tracking-widest">
                      {tag}
                    </span>
                  ))}
                </div>
                <button className="w-full py-3 bg-white text-slate-900 text-[9px] font-black uppercase tracking-widest hover:bg-orange-600 hover:text-white transition-all">
                  View Specs
                </button>
              </div>
            </div>
          )}

          {/* Grid Items - 1 Column Each */}
          {gridItems.map((p) => (
            <motion.div 
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              key={p.id} 
              onClick={() => setSelectedProduct(p)}
              className="bg-white border border-slate-100 group hover:border-orange-600 transition-all duration-300 flex flex-col cursor-pointer"
            >
              <div className="aspect-[4/3] overflow-hidden relative bg-slate-50">
                <img 
                  src={p.image} 
                  alt={p.name} 
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" 
                  referrerPolicy="no-referrer" 
                />
                <div className="absolute top-3 left-3 bg-slate-900 text-white px-2 py-0.5 text-[7px] font-black uppercase tracking-widest">
                  {p.id}
                </div>
                <div className="absolute bottom-3 left-3 flex gap-1">
                  {p.techTags?.map((tag, i) => (
                    <span key={i} className="px-1.5 py-0.5 bg-white/90 text-slate-900 text-[7px] font-black uppercase tracking-tighter">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="p-5 flex-grow flex flex-col">
                <h4 className="text-xs font-black text-slate-900 uppercase tracking-tight mb-2 group-hover:text-orange-600 transition-colors">{p.name}</h4>
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-1 h-1 bg-orange-600 rounded-full" />
                  <span className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">{p.features[0]}</span>
                </div>
                <div className="mt-auto pt-3 border-t border-slate-50 flex justify-between items-center">
                  <span className="text-[7px] font-black text-slate-400 uppercase tracking-widest">{p.compliance}</span>
                  <ChevronRight className="w-3 h-3 text-slate-300 group-hover:text-orange-600 transition-all" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Simulated Brochure Modal */}
      <AnimatePresence mode="wait">
        {selectedProduct && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-12 overflow-hidden">
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProduct(null)}
              className="absolute inset-0 bg-slate-900/95 backdrop-blur-2xl"
            />
            
            {/* Brochure Container */}
            <motion.div 
              key={selectedProduct.id}
              initial={{ scale: 0.95, opacity: 0, x: 50, rotateY: -10 }}
              animate={{ scale: 1, opacity: 1, x: 0, rotateY: 0 }}
              exit={{ scale: 0.95, opacity: 0, x: -50, rotateY: 10 }}
              transition={{ type: "spring", damping: 25, stiffness: 120 }}
              className="relative w-full max-w-6xl aspect-[16/10] bg-white shadow-[0_60px_120px_-20px_rgba(0,0,0,0.7)] flex overflow-hidden origin-center rounded-sm"
              style={{ perspective: "2500px" }}
            >
              {/* Paper Texture Overlay */}
              <div className="absolute inset-0 pointer-events-none opacity-[0.03] mix-blend-multiply z-50" 
                   style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} />

              {/* Close Button (Inside Brochure) */}
              <button 
                onClick={() => setSelectedProduct(null)}
                className="absolute top-6 right-6 w-10 h-10 rounded-full bg-slate-900/10 text-slate-400 flex items-center justify-center z-[100] hover:bg-orange-600 hover:text-white transition-all"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Left Page: Visual Gallery */}
              <div className="w-1/2 h-full bg-white relative overflow-hidden border-r border-slate-100">
                <motion.div 
                  key={currentImageIndex}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="h-full w-full relative"
                >
                  <img 
                    src={selectedProduct.gallery[currentImageIndex]} 
                    alt={selectedProduct.name} 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  
                  {/* Image Navigation */}
                  <div className="absolute bottom-12 left-12 right-12 flex justify-between items-end z-20">
                    <div className="space-y-3">
                      <div className="text-[9px] font-black text-white bg-slate-900 px-3 py-1 uppercase tracking-[0.2em] inline-block">
                        Detail {currentImageIndex + 1}/{selectedProduct.gallery.length}
                      </div>
                      <div className="flex gap-1.5">
                        {selectedProduct.gallery.map((_: any, i: number) => (
                          <button 
                            key={i} 
                            onClick={() => setCurrentImageIndex(i)}
                            className={`h-1 transition-all duration-500 ${i === currentImageIndex ? 'w-10 bg-orange-600' : 'w-4 bg-slate-200'}`} 
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Right Page: Technical Dossier */}
              <div className="w-1/2 h-full bg-white p-16 flex flex-col relative overflow-y-auto">
                <div className="relative z-20">
                  <div className="flex justify-between items-start mb-14">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-px bg-orange-600" />
                        <span className="text-[9px] font-black text-orange-600 uppercase tracking-[0.4em]">{selectedProduct.id}</span>
                      </div>
                      <h4 className="text-5xl font-black text-slate-900 uppercase tracking-tighter italic leading-none">{selectedProduct.name}</h4>
                    </div>
                    <div className="bg-slate-900 text-white px-3 py-1 text-[8px] font-black uppercase tracking-widest">
                      {selectedProduct.category}
                    </div>
                  </div>

                  <div className="space-y-14">
                    <section>
                      <h5 className="text-[9px] font-black text-slate-400 uppercase tracking-[0.5em] mb-6 flex items-center gap-4">
                        01. Overview <div className="flex-grow h-px bg-slate-100" />
                      </h5>
                      <p className="text-slate-600 text-[13px] leading-relaxed font-medium italic border-l-2 border-slate-100 pl-6">
                        "{selectedProduct.description}"
                      </p>
                    </section>

                    <section>
                      <h5 className="text-[9px] font-black text-slate-400 uppercase tracking-[0.5em] mb-6 flex items-center gap-4">
                        02. Engineering <div className="flex-grow h-px bg-slate-100" />
                      </h5>
                      <div className="grid grid-cols-1 gap-3">
                        {Object.entries(selectedProduct.specs).map(([key, value]: [string, any]) => (
                          <div key={key} className="flex justify-between items-center group">
                            <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest group-hover:text-orange-600 transition-colors">{key}</span>
                            <div className="flex-grow mx-4 border-b border-dotted border-slate-200" />
                            <span className="text-[10px] font-bold text-slate-900 uppercase">{value}</span>
                          </div>
                        ))}
                      </div>
                    </section>

                    <div className="grid grid-cols-2 gap-10">
                      <section>
                        <h5 className="text-[9px] font-black text-slate-400 uppercase tracking-[0.5em] mb-4">Compliance</h5>
                        <div className="text-2xl font-black text-slate-900 italic tracking-tighter">{selectedProduct.compliance}</div>
                        <div className="text-[8px] font-bold text-slate-400 uppercase mt-1">Certified Industrial Grade</div>
                      </section>
                      <section>
                        <h5 className="text-[9px] font-black text-slate-400 uppercase tracking-[0.5em] mb-4">Logistics</h5>
                        <div className="space-y-1">
                          <div className="text-[10px] font-bold text-slate-900 uppercase">MOQ: 500 Pairs</div>
                          <div className="text-[10px] font-bold text-slate-900 uppercase">Lead: 35-45 Days</div>
                        </div>
                      </section>
                    </div>
                  </div>

                  {/* Inquiry Footer */}
                  <div className="mt-24 pt-10 border-t border-slate-200 flex justify-between items-center">
                    <div className="flex gap-2">
                      {selectedProduct.techTags.map((tag: string, i: number) => (
                        <span key={i} className="px-2 py-1 border border-slate-200 text-slate-400 text-[8px] font-black uppercase tracking-widest">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <button className="bg-slate-900 text-white px-8 py-4 text-[10px] font-black uppercase tracking-widest shadow-xl hover:bg-orange-600 transition-all flex items-center gap-3">
                      Inquiry <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Page Number Decoration */}
                <div className="absolute bottom-8 right-12 text-[9px] font-black text-slate-300 uppercase tracking-[0.3em]">
                  TitanSource / Technical Lookbook / P.0{products.findIndex(p => p.id === selectedProduct.id) + 1}
                </div>
              </div>

              {/* Physical Book Edge Effect */}
              <div className="absolute right-0 top-0 w-1 h-full bg-slate-100 z-[70]" />
            </motion.div>

            {/* Floating Navigation Buttons (Screen Edges) */}
            <div className="absolute inset-y-0 left-8 flex items-center z-[110]">
              <button 
                onClick={handlePrev}
                className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white flex items-center justify-center hover:bg-white hover:text-slate-900 transition-all shadow-2xl group"
              >
                <ChevronRight className="w-8 h-8 rotate-180 group-hover:-translate-x-1 transition-transform" />
              </button>
            </div>

            <div className="absolute bottom-12 right-12 z-[110]">
              <button 
                onClick={handleNext}
                className="px-6 h-14 rounded-full bg-orange-600 text-white flex items-center gap-3 hover:bg-white hover:text-orange-600 transition-all shadow-xl group"
              >
                <span className="text-[10px] font-black uppercase tracking-widest">Next Product</span>
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

const GlobalReach = () => {
  const stats = [
    { label: "Annual Export", value: "5,000,000+", sub: "Pairs Manufactured", icon: <Truck className="w-5 h-5" /> },
    { label: "Global Reach", value: "85+", sub: "Nations & Territories", icon: <Globe className="w-5 h-5" /> },
    { label: "Compliance", value: "100%", sub: "International Standards", icon: <ShieldCheck className="w-5 h-5" /> },
    { label: "Technical Patents", value: "120+", sub: "In-house Innovations", icon: <Zap className="w-5 h-5" /> }
  ];

  return (
    <section id="global" className="py-32 bg-slate-900 relative overflow-hidden">
      {/* Improved Background Map - Clean & Structured */}
      <div className="absolute inset-0 opacity-[0.15] pointer-events-none">
        <svg className="w-full h-full" viewBox="0 0 1000 500" preserveAspectRatio="xMidYMid slice" fill="none" stroke="white" strokeWidth="0.5">
          {/* Simplified World Map Outline */}
          <path d="M150,150 Q200,100 250,150 T350,150 M450,200 Q500,150 550,200 T650,200 M750,100 Q800,50 850,100 T950,100" strokeDasharray="2,2" />
          <circle cx="500" cy="250" r="6" fill="#ea580c" className="animate-pulse" />
          <circle cx="500" cy="250" r="20" stroke="#ea580c" strokeWidth="1" opacity="0.3" className="animate-ping" />
          
          {/* Grid lines for technical feel */}
          {[...Array(10)].map((_, i) => (
            <line key={`v-${i}`} x1={i * 100} y1="0" x2={i * 100} y2="500" stroke="white" opacity="0.1" />
          ))}
          {[...Array(5)].map((_, i) => (
            <line key={`h-${i}`} x1="0" y1={i * 100} x2="1000" y2={i * 100} stroke="white" opacity="0.1" />
          ))}
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-24 items-center">
          <div>
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-1 bg-orange-600" />
              <h2 className="text-[10px] font-black text-orange-500 uppercase tracking-[0.5em]">Global Scale</h2>
            </div>
            <h3 className="text-7xl font-black text-white uppercase tracking-tighter leading-[0.85] mb-12 italic">
              Exporting <br />
              <span className="text-orange-600">Excellence.</span>
            </h3>
            <p className="text-slate-400 text-xl mb-16 leading-relaxed max-w-lg font-medium">
              From our centralized manufacturing hub, we power industrial safety across 6 continents. Our scale is built on consistent quality and a robust international supply chain.
            </p>
            
            <div className="grid sm:grid-cols-2 gap-12">
              {stats.map((s, i) => (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  key={i} 
                  className="group"
                >
                  <div className="text-orange-600 mb-4">{s.icon}</div>
                  <div className="text-4xl font-black text-white italic mb-1 tracking-tighter">{s.value}</div>
                  <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">{s.label}</div>
                  <div className="text-[9px] font-bold text-slate-600 uppercase tracking-widest">{s.sub}</div>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="aspect-square bg-orange-600/10 rounded-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] blur-[120px]" />
            <div className="relative z-10 p-12 bg-white/5 backdrop-blur-sm border border-white/10">
              <div className="flex items-center gap-4 mb-10">
                <div className="w-3 h-3 bg-orange-600 rounded-full animate-ping" />
                <span className="text-[10px] font-black text-white uppercase tracking-[0.3em]">Live Manufacturing Hub: East Asia</span>
              </div>
              <div className="space-y-8">
                <div className="flex justify-between items-end border-b border-white/10 pb-6">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Current Production Load</span>
                  <span className="text-2xl font-black text-white italic">94%</span>
                </div>
                <div className="flex justify-between items-end border-b border-white/10 pb-6">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Global Shipping Status</span>
                  <span className="text-2xl font-black text-green-500 italic uppercase">Optimal</span>
                </div>
                <div className="flex justify-between items-end border-b border-white/10 pb-6">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Export Destinations</span>
                  <span className="text-2xl font-black text-white italic">85 Nations</span>
                </div>
              </div>
              <div className="mt-12">
                <div className="text-[9px] font-black text-slate-500 uppercase tracking-[0.2em] mb-4">Major Export Corridors</div>
                <div className="flex flex-wrap gap-3">
                  {["North America", "European Union", "Southeast Asia", "Middle East", "Australia"].map((region, i) => (
                    <span key={i} className="px-3 py-1 bg-white/10 text-white text-[9px] font-black uppercase tracking-widest">
                      {region}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const TechnicalOEM = () => {
  const components = [
    { title: "Steel Toe Cap", desc: "200J Impact resistance.", icon: <HardHat className="w-5 h-5" /> },
    { title: "Kevlar Midsole", desc: "Zero-penetration protection.", icon: <ShieldCheck className="w-5 h-5" /> },
    { title: "PU/Rubber Sole", desc: "SRC slip resistance.", icon: <Activity className="w-5 h-5" /> },
    { title: "Breathable Lining", desc: "Moisture-wicking mesh.", icon: <Layers className="w-5 h-5" /> }
  ];

  const steps = [
    { step: "01", title: "Technical Brief", desc: "Market standards & safety analysis." },
    { step: "02", title: "R&D Prototyping", desc: "Rapid sample development." },
    { step: "03", title: "Tooling & Mold", desc: "Precision custom molds." },
    { step: "04", title: "Mass Production", desc: "ISO-certified high volume." },
    { step: "05", title: "Global Logistics", desc: "Seamless supply chain." }
  ];

  return (
    <section id="oem" className="py-32 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-24">
          
          {/* Left: Technical Excellence */}
          <div className="space-y-16">
            <div>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-1 bg-orange-600" />
                <h2 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.5em]">Engineering Core</h2>
              </div>
              <h3 className="text-5xl font-black text-slate-900 uppercase tracking-tighter leading-[0.85] italic mb-8">
                Technical <br />
                <span className="text-orange-600">Foundation.</span>
              </h3>
              <p className="text-slate-500 text-lg leading-relaxed max-w-md font-medium">
                Our OEM capability is rooted in our mastery of core components. We manufacture our own safety elements to ensure total quality control.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-8">
              {components.map((c, i) => (
                <div key={i} className="p-6 bg-slate-50 border border-slate-100 hover:border-orange-600 transition-all group">
                  <div className="text-orange-600 mb-4 group-hover:scale-110 transition-transform">{c.icon}</div>
                  <h4 className="text-[10px] font-black text-slate-900 uppercase tracking-widest mb-2">{c.title}</h4>
                  <p className="text-[9px] text-slate-400 font-bold uppercase leading-relaxed">{c.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right: OEM Workflow */}
          <div className="bg-slate-900 p-12 lg:p-20 relative">
            <div className="absolute top-0 right-0 w-32 h-32 bg-orange-600/10 -translate-y-1/2 translate-x-1/2 rounded-full blur-3xl" />
            
            <div className="relative z-10">
              <h4 className="text-3xl font-black text-white uppercase tracking-tighter italic mb-12">
                OEM/ODM <span className="text-orange-600">Workflow.</span>
              </h4>
              
              <div className="space-y-10">
                {steps.map((s, i) => (
                  <div key={i} className="flex gap-8 group">
                    <div className="text-2xl font-black text-orange-600/30 group-hover:text-orange-600 transition-colors italic">{s.step}</div>
                    <div>
                      <h5 className="text-xs font-black text-white uppercase tracking-widest mb-2">{s.title}</h5>
                      <p className="text-[10px] text-slate-400 font-medium uppercase tracking-wider leading-relaxed">{s.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-16 pt-10 border-t border-white/10">
                <button className="w-full bg-orange-600 text-white py-5 font-black text-[10px] uppercase tracking-[0.3em] hover:bg-white hover:text-slate-900 transition-all">
                  Start Custom Project
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

const Testimonials = () => {
  const reviews = [
    { company: "Global Safety Inc.", region: "USA", text: "The production capacity is unmatched. We moved our entire OEM line to Titan and saw a 15% reduction in lead times.", author: "Director of Procurement" },
    { company: "Nordic Industrial", region: "Sweden", text: "Exceptional technical standards. Their in-house lab provides the data transparency we need for European compliance.", author: "Quality Assurance Lead" },
    { company: "Apex Logistics", region: "UK", text: "Reliable, high-volume supply. The quality consistency across 50,000 pairs is exactly what our distribution network requires.", author: "Supply Chain Manager" }
  ];

  return (
    <section className="py-32 bg-slate-50 border-y border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-24">
          <div className="inline-flex items-center gap-4 mb-6">
            <div className="w-8 h-1 bg-orange-600" />
            <h2 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.5em]">Global Partnerships</h2>
            <div className="w-8 h-1 bg-orange-600" />
          </div>
          <h3 className="text-5xl font-black text-slate-900 uppercase tracking-tighter italic">Trusted by <span className="text-orange-600">Industry Leaders.</span></h3>
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
          {reviews.map((r, i) => (
            <div key={i} className="bg-white p-12 border border-slate-100 relative group">
              <div className="absolute top-0 left-0 w-1 h-0 bg-orange-600 group-hover:h-full transition-all duration-500" />
              <p className="text-slate-500 italic mb-10 leading-relaxed font-medium">"{r.text}"</p>
              <div>
                <div className="text-lg font-black text-slate-900 uppercase tracking-tight">{r.company}</div>
                <div className="flex items-center gap-3">
                  <span className="text-[9px] font-black text-orange-600 uppercase tracking-widest">{r.region}</span>
                  <div className="w-4 h-px bg-slate-200" />
                  <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">{r.author}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Contact = () => {
  return (
    <section id="contact" className="py-32 bg-slate-900 relative overflow-hidden">
      {/* Decorative Background Element */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-orange-600 skew-x-12 translate-x-32 hidden lg:block" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row gap-20">
          <div className="lg:w-1/2">
            <h2 className="text-[10px] font-black text-orange-500 uppercase tracking-[0.5em] mb-8">Global Procurement</h2>
            <h3 className="text-6xl md:text-7xl font-black text-white uppercase tracking-tighter leading-[0.85] mb-12 italic">
              Ready for <br />
              <span className="text-orange-500">Massive</span> <br />
              Scale?
            </h3>
            <p className="text-slate-400 text-lg mb-16 leading-relaxed max-w-md">
              Whether you need 10,000 pairs or a custom OEM line, our factory is equipped for your most demanding requirements.
            </p>
            
            <div className="grid sm:grid-cols-2 gap-10">
              <div className="group">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-10 h-1 bg-orange-600" />
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">Direct Line</p>
                </div>
                <p className="text-2xl font-black text-white">+1 (555) 000-TITAN</p>
              </div>
              <div className="group">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-10 h-1 bg-orange-600" />
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">Technical Support</p>
                </div>
                <p className="text-2xl font-black text-white">b2b@titan-source.com</p>
              </div>
            </div>

            <div className="mt-20 p-8 border-2 border-orange-600/30 inline-block">
              <div className="flex items-center gap-6">
                <div className="bg-orange-600 p-4">
                  <MapPin className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h4 className="text-white font-black uppercase tracking-widest text-xs mb-1">Factory Headquarters</h4>
                  <p className="text-slate-400 text-sm">Industrial Hub A, Manufacturing District 7</p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:w-1/2 bg-white p-10 md:p-16 shadow-2xl">
            <h4 className="text-2xl font-black text-slate-900 uppercase tracking-tight mb-10">Wholesale Inquiry Form</h4>
            <form className="grid md:grid-cols-2 gap-8">
              <div className="md:col-span-1">
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Full Name</label>
                <input type="text" className="w-full px-6 py-4 bg-slate-50 border-b-2 border-slate-200 text-slate-900 focus:border-orange-600 outline-none transition-all text-xs font-bold" placeholder="Contact Person" />
              </div>
              <div className="md:col-span-1">
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Business Email</label>
                <input type="email" className="w-full px-6 py-4 bg-slate-50 border-b-2 border-slate-200 text-slate-900 focus:border-orange-600 outline-none transition-all text-xs font-bold" placeholder="name@company.com" />
              </div>
              <div className="md:col-span-1">
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Company Name</label>
                <input type="text" className="w-full px-6 py-4 bg-slate-50 border-b-2 border-slate-200 text-slate-900 focus:border-orange-600 outline-none transition-all text-xs font-bold" placeholder="Wholesale / Distributor" />
              </div>
              <div className="md:col-span-1">
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Target Market</label>
                <select className="w-full px-6 py-4 bg-slate-50 border-b-2 border-slate-200 text-slate-900 focus:border-orange-600 outline-none transition-all text-xs font-bold appearance-none">
                  <option>USA / North America</option>
                  <option>Europe / UK</option>
                  <option>Southeast Asia</option>
                  <option>Middle East</option>
                </select>
              </div>
              <div className="md:col-span-2">
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Technical Requirements</label>
                <textarea rows={4} className="w-full px-6 py-4 bg-slate-50 border-b-2 border-slate-200 text-slate-900 focus:border-orange-600 outline-none transition-all text-xs font-bold" placeholder="Annual volume, specific safety standards, customization needs..."></textarea>
              </div>
              <div className="md:col-span-2">
                <button className="w-full bg-orange-600 text-white py-6 font-black text-xs uppercase tracking-[0.4em] hover:bg-slate-900 transition-all shadow-xl shadow-orange-600/20">
                  Submit Technical Inquiry
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="bg-white py-20 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-16">
          <div className="flex items-center gap-3">
            <div className="bg-orange-600 p-2 rounded-lg">
              <Factory className="text-white w-6 h-6" />
            </div>
            <div className="flex flex-col leading-none">
              <span className="text-2xl font-black tracking-tighter text-slate-900 uppercase italic">Titan<span className="text-orange-600">Source</span></span>
              <span className="text-[9px] font-bold text-slate-500 tracking-[0.4em] uppercase">Manufacturing Group</span>
            </div>
          </div>
          
          <div className="flex flex-wrap justify-center gap-12 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
            <a href="#" className="hover:text-orange-600 transition-colors">Compliance</a>
            <a href="#" className="hover:text-slate-900 transition-colors">OEM Process</a>
            <a href="#" className="hover:text-slate-900 transition-colors">R&D Lab</a>
            <a href="#" className="hover:text-slate-900 transition-colors">Privacy</a>
          </div>

          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.2em]">
            © 2026 Titan Industrial Manufacturing Group.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default function App() {
  return (
    <div className="min-h-screen bg-white font-sans selection:bg-orange-600 selection:text-white">
      <Navigation />
      <main>
        <Hero />
        <ManufacturingExcellence />
        <TechnicalMatrix />
        <GlobalCompliance />
        <GlobalReach />
        <TechnicalOEM />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
