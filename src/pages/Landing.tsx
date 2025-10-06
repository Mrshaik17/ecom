import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { 
  MessageCircle, Truck, Shield, Clock, Watch, Shirt, 
  Smartphone, ShoppingBag, Gift, Star, Mail, Phone, 
  MapPin, CheckCircle, Zap, Heart, Award 
} from 'lucide-react';
import watch1 from '@/assets/watches/1.jpg';
import watch2 from '@/assets/watches/2.jpg';
import watch3 from '@/assets/watches/3.jpg';
import watch4 from '@/assets/watches/4.jpg';
import watch5 from '@/assets/watches/5.jpg';
import watch6 from '@/assets/watches/6.jpg';
import shoe1 from '@/assets/shoes/1.jpg';
import shoe2 from '@/assets/shoes/2.jpg';
import shoe3 from '@/assets/shoes/3.jpg';
import casualShirt from '@/assets/clothing/casual-shirt-1.jpg';
import earbuds from '@/assets/gadgets/wireless-earbuds-1.jpg';
import { watch15, watch17, watch20 } from '@/assets/watches';
import { clothingImages } from '@/assets/clothing';
import { shoeImages } from '@/assets/shoes';
import { watchImages } from '@/assets/watches';
import { gadgetImages } from '@/assets/gadgets';
import { premiumImages } from '@/assets/premium';

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 60 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6 }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

// Animated section wrapper
const AnimatedSection = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={fadeInUp}
      className={className}
    >
      {children}
    </motion.div>
  );
};

const Landing = () => {
  const whatsappNumber = '9885522948';
  const whatsappLink = `https://wa.me/${whatsappNumber}`;
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.3], [1, 0.8]);

  const categories = [
    { name: 'Watches', image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30' },
    { name: 'Shirts', image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c' },
    { name: 'Pants', image: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80' },
    { name: 'Tracks', image: 'https://images.unsplash.com/photo-1517438476312-10d79c077509' },
    { name: 'Shoes', image: 'https://images.unsplash.com/photo-1460353581641-37baddab0fa2' },
    { name: 'Premium Collection', image: 'https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd' },
    { name: 'Slides/Slippers', image: 'https://images.unsplash.com/photo-1603487742131-4160ec999306' },
    { name: 'Gadgets', image: 'https://images.unsplash.com/photo-1625772452859-1c03d5bf1137' },
    { name: 'Combo Offers', image: 'https://images.unsplash.com/photo-1607083206869-4c7672e72a8a' },
    { name: 'Coming Soon', image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d' },
    { name: 'Coming Soon', image: 'https://images.unsplash.com/photo-1513094735237-8f2714d57c13' },
    { name: 'Coming Soon', image: 'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04' },
  ];

  const features = [
    {
      icon: MessageCircle,
      title: 'Easy Communication',
      description: 'Connect with us instantly through WhatsApp for seamless ordering',
    },
    {
      icon: Truck,
      title: 'Swift Delivery',
      description: 'Lightning-fast shipping to get your products quickly',
    },
    {
      icon: Shield,
      title: 'Secure Shopping',
      description: 'Protected payments and data security guaranteed',
    },
    {
      icon: Clock,
      title: 'Always Available',
      description: 'Round-the-clock customer support whenever you need',
    },
    {
      icon: Award,
      title: 'Premium Quality',
      description: 'Authentic imported products with quality assurance',
    },
    {
      icon: Heart,
      title: 'Customer First',
      description: 'Your satisfaction is our top priority',
    },
  ];

  const galleryImages = [
    watch1, watch2, watch3, watch4, watch5, watch6,
    shoe1, shoe2, shoe3, casualShirt, earbuds
  ];

  const testimonials = [
    {
      name: 'Rahul Sharma',
      text: 'Excellent quality products and amazing customer service. The WhatsApp ordering is so convenient!',
      rating: 5,
    },
    {
      name: 'Priya Patel',
      text: 'Love the collection! Fast delivery and genuine products. Highly recommended.',
      rating: 5,
    },
    {
      name: 'Amit Kumar',
      text: 'Best place for imported watches and accessories. Great prices and quality.',
      rating: 5,
    },
    {
      name: 'Sneha Reddy',
      text: 'Professional service and beautiful products. Will definitely order again!',
      rating: 5,
    },
  ];

  const whyChooseUs = [
    'Authentic imported products',
    'Competitive pricing',
    'Fast and secure delivery',
    'Easy exchange policy',
    '100% quality assurance',
    'Dedicated customer support',
  ];

  const handleGetStarted = () => {
    window.location.href = '/login';
  };

  return (
    <div className="min-h-screen overflow-x-hidden">
      {/* Header */}
      <motion.header 
        className="bg-background/95 backdrop-blur-sm border-b sticky top-0 z-50"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="container mx-auto px-4 py-3 md:py-4">
          <div className="flex items-center justify-between">
            <motion.div 
              className="bg-gradient-hero text-primary-foreground px-2 md:px-3 py-1 md:py-1.5 rounded-lg font-bold text-base md:text-xl"
              whileHover={{ scale: 1.05 }}
            >
              House Of Styles
            </motion.div>
            <nav className="hidden md:flex items-center space-x-4 lg:space-x-6">
              <a href="#hero" className="text-muted-foreground hover:text-primary transition-colors text-sm lg:text-base">
                Home
              </a>
              <a href="#categories" className="text-muted-foreground hover:text-primary transition-colors text-sm lg:text-base">
                Shop / Categories
              </a>
              <a href="#about" className="text-muted-foreground hover:text-primary transition-colors text-sm lg:text-base">
                About Us
              </a>
              <a href="#contact" className="text-muted-foreground hover:text-primary transition-colors text-sm lg:text-base">
                Contact / Support
              </a>
            </nav>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button className="bg-gradient-button hover:bg-primary-hover text-sm md:text-base px-3 md:px-4 py-2" onClick={handleGetStarted}>
                Get Started
              </Button>
            </motion.div>
          </div>
        </div>
      </motion.header>

      {/* Hero Section */}
      <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-primary/20 via-background to-secondary">
        <motion.div 
          className="absolute inset-0 bg-gradient-hero opacity-10"
          style={{ opacity, scale }}
        />
        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.h1 
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 md:mb-6 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-white px-4"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            House Of Styles
          </motion.h1>
          <motion.p 
            className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-gray-foreground mb-8 md:mb-12 max-w-3xl mx-auto px-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Discover premium imported products with exceptional quality and service
          </motion.p>
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Button
              size="lg"
              className="bg-gradient-button hover:bg-primary-hover text-base md:text-lg px-8 md:px-12 py-5 md:py-7 rounded-full shadow-2xl hover:shadow-primary/50 transition-all duration-300"
              onClick={handleGetStarted}
            >
              <Zap className="mr-2 h-5 w-5 md:h-6 md:w-6" />
              Get Started
            </Button>
          </motion.div>
        </div>
        
        {/* Floating elements */}
        <motion.div
          className="absolute top-20 left-10 w-20 h-20 bg-primary/20 rounded-full blur-xl"
          animate={{ y: [0, -20, 0], scale: [1, 1.2, 1] }}
          transition={{ duration: 4, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-32 h-32 bg-primary/10 rounded-full blur-2xl"
          animate={{ y: [0, 20, 0], scale: [1, 1.3, 1] }}
          transition={{ duration: 5, repeat: Infinity }}
        />
      </section>

      {/* Features Section */}
      <section id="features" className="py-12 md:py-24">
        <div className="container mx-auto px-4">
          <AnimatedSection>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-8 md:mb-16">
              Why Choose Us
            </h2>
          </AnimatedSection>
          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {features.map((feature, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <Card className="p-4 md:p-8 h-full hover:shadow-2xl transition-all duration-300 group cursor-pointer border-2 hover:border-primary/50">
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ duration: 0.3 }}
                  >
                    <feature.icon className="h-10 w-10 md:h-14 md:w-14 mb-4 md:mb-6 text-primary group-hover:text-primary/80 transition-colors" />
                  </motion.div>
                  <h3 className="font-semibold text-lg md:text-xl mb-2 md:mb-3 group-hover:text-primary transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Categories Section */}
      <section id="categories" className="py-12 md:py-24 bg-secondary/30">
        <div className="container mx-auto px-4">
          <AnimatedSection>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-8 md:mb-16">
              Our Collection
            </h2>
          </AnimatedSection>
          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {categories.map((category, index) => (
              <motion.div
                key={`${category.name}-${index}`}
                variants={fadeInUp}
                whileHover={{ scale: category.image ? 1.05 : 1 }}
                className="flex flex-col"
              >
                <Card className={`relative overflow-hidden group cursor-pointer h-48 sm:h-56 md:h-64 ${category.image ? 'border-2 hover:border-primary/50 transition-all duration-300 hover:shadow-2xl' : 'border-2 border-dashed border-muted-foreground/30'}`}>
                  {category.image ? (
                    <>
                      <img
                        src={category.image}
                        alt={category.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </>
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center bg-secondary/10">
                      <span className="text-4xl md:text-5xl lg:text-6xl text-muted-foreground/20">?</span>
                    </div>
                  )}
                </Card>
                <h3 className={`font-semibold text-sm md:text-base lg:text-lg text-center mt-3 px-2 ${!category.image && 'text-muted-foreground'}`}>
                  {category.name}
                </h3>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Parallax Section */}
      <section className="relative py-16 md:py-32 overflow-hidden">
        <motion.div 
          className="absolute inset-0 bg-gradient-hero"
          style={{ 
            y: useTransform(scrollYProgress, [0, 1], ['0%', '50%'])
          }}
        />
        <div className="container mx-auto px-4 relative z-10 text-center">
          <motion.h2 
            className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-bold text-white mb-4 md:mb-6 px-4"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            Shopping Made Simple, Smart & Secure
          </motion.h2>
          <motion.p
            className="text-base sm:text-lg md:text-xl text-white/90 max-w-2xl mx-auto px-4"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Experience the future of online shopping with us
          </motion.p>
        </div>
      </section>

      {/* Why Choose Us - Split Layout */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <AnimatedSection>
              <div className="relative">
                <motion.img
                  src={watch1}
                  alt="Premium products"
                  className="rounded-2xl shadow-2xl"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                />
                <motion.div
                  className="absolute -bottom-6 -right-6 bg-primary text-primary-foreground p-6 rounded-xl shadow-xl"
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                >
                  <p className="font-bold text-2xl">1000+</p>
                  <p className="text-sm">Happy Customers</p>
                </motion.div>
              </div>
            </AnimatedSection>
            <AnimatedSection>
              <h2 className="text-4xl md:text-5xl font-bold mb-8">
                Why Choose House Of Styles
              </h2>
              <div className="space-y-4">
                {whyChooseUs.map((item, index) => (
                  <motion.div
                    key={index}
                    className="flex items-start space-x-3"
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                    <p className="text-lg text-muted-foreground">{item}</p>
                  </motion.div>
                ))}
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>


      {/* Testimonials Section */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <AnimatedSection>
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
              What Our Customers Say
            </h2>
          </AnimatedSection>
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {testimonials.map((testimonial, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <Card className="p-6 h-full hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                  <div className="flex mb-3">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-primary text-primary" />
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-4 italic">
                    "{testimonial.text}"
                  </p>
                  <p className="font-semibold">{testimonial.name}</p>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* About Us Section */}
      <section id="about" className="py-24 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <AnimatedSection>
              <h2 className="text-4xl md:text-5xl font-bold text-center mb-12">
                About House Of Styles
              </h2>
            </AnimatedSection>
            <motion.div
              className="space-y-6 text-lg text-muted-foreground leading-relaxed"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <p className="text-center">
                Welcome to House Of Styles, your trusted destination for premium imported products. 
                We specialize in bringing you the finest watches, fashion items, electronics, and lifestyle products 
                from around the world.
              </p>
              <p className="text-center">
                Our mission is to provide high-quality products with exceptional customer service. 
                We believe in making shopping convenient and hassle-free, ensuring fast delivery and secure payments.
              </p>
              <p className="text-center">
                With a commitment to quality and customer satisfaction, we've become the preferred choice 
                for customers looking for authentic imported products at competitive prices.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Call To Action */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <motion.div
            className="bg-gradient-hero rounded-3xl p-12 md:p-20 text-center relative overflow-hidden"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"
              animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
              transition={{ duration: 4, repeat: Infinity }}
            />
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 relative z-10">
              Ready to Start Shopping?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto relative z-10">
              Join thousands of satisfied customers and discover premium products today
            </p>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative z-10"
            >
              <Button
                size="lg"
                className="bg-white text-primary hover:bg-white/90 text-lg px-12 py-7 rounded-full shadow-2xl"
                onClick={handleGetStarted}
              >
                Get Started Now
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 bg-secondary/30">
        <div className="container mx-auto px-4">
          <AnimatedSection>
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
              Get In Touch
            </h2>
          </AnimatedSection>
          <div className="max-w-3xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <motion.div
                whileHover={{ scale: 1.05, y: -5 }}
                className="text-center"
              >
                <Card className="p-6 hover:shadow-xl transition-all">
                  <motion.div whileHover={{ rotate: 360 }} transition={{ duration: 0.5 }}>
                    <MessageCircle className="h-12 w-12 mx-auto mb-4 text-primary" />
                  </motion.div>
                  <p className="font-semibold mb-2">WhatsApp</p>
                  <p className="text-sm text-muted-foreground">+91 9885522948</p>
                </Card>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05, y: -5 }}
                className="text-center"
              >
                <Card className="p-6 hover:shadow-xl transition-all">
                  <motion.div whileHover={{ rotate: 360 }} transition={{ duration: 0.5 }}>
                    <Mail className="h-12 w-12 mx-auto mb-4 text-primary" />
                  </motion.div>
                  <p className="font-semibold mb-2">Email</p>
                  <p className="text-sm text-muted-foreground">houseofstyles2021@gmail.com</p>
                </Card>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05, y: -5 }}
                className="text-center"
              >
                <Card className="p-6 hover:shadow-xl transition-all">
                  <motion.div whileHover={{ rotate: 360 }} transition={{ duration: 0.5 }}>
                    <MapPin className="h-12 w-12 mx-auto mb-4 text-primary" />
                  </motion.div>
                  <p className="font-semibold mb-2">Location</p>
                  <p className="text-sm text-muted-foreground">India</p>
                </Card>
              </motion.div>
            </div>
            <div className="text-center">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  size="lg"
                  className="bg-green-500 hover:bg-green-600 text-white text-lg px-12 py-6 rounded-full shadow-xl hover:shadow-2xl transition-all"
                  onClick={() => window.open(whatsappLink, '_blank')}
                >
                  <MessageCircle className="mr-2 h-6 w-6" />
                  Chat on WhatsApp
                </Button>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-background border-t py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
            <motion.div 
              className="bg-gradient-hero text-primary-foreground px-3 py-1.5 rounded-lg font-bold text-xl"
              whileHover={{ scale: 1.05 }}
            >
              House Of Styles
            </motion.div>
            <div className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
              <Link to="/privacy-policy" className="hover:text-primary transition-colors hover:underline">
                Privacy Policy
              </Link>
              <Link to="/terms-of-service" className="hover:text-primary transition-colors hover:underline">
                Terms of Service
              </Link>
              <Link to="/shipping-info" className="hover:text-primary transition-colors hover:underline">
                Shipping Info
              </Link>
              <Link to="/returns-refunds" className="hover:text-primary transition-colors hover:underline">
                Returns & Refunds
              </Link>
            </div>
          </div>
          <div className="mt-8 text-center">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} House Of Styles. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
