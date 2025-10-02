import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { MessageCircle, Truck, Shield, Clock, Watch, Shirt, Smartphone, ShoppingBag, Gift } from 'lucide-react';
import watch1 from '@/assets/watches/1.jpg';
import watch2 from '@/assets/watches/2.jpg';
import watch3 from '@/assets/watches/3.jpg';
import watch4 from '@/assets/watches/4.jpg';
import shoe1 from '@/assets/shoes/1.jpg';
import shoe2 from '@/assets/shoes/2.jpg';
import casualShirt from '@/assets/clothing/casual-shirt-1.jpg';
import earbuds from '@/assets/gadgets/wireless-earbuds-1.jpg';

const Landing = () => {
  const whatsappNumber = '9885522948';
  const whatsappLink = `https://wa.me/${whatsappNumber}`;

  const categories = [
    { name: 'Watches', icon: Watch, link: '/category/watches' },
    { name: 'Fashion', icon: Shirt, link: '/category/clothing' },
    { name: 'Electronics', icon: Smartphone, link: '/category/gadgets' },
    { name: 'Bags & Lifestyle', icon: ShoppingBag, link: '/category/shoes' },
    { name: 'Gifts & Others', icon: Gift, link: '/categories' },
  ];

  const features = [
    {
      icon: MessageCircle,
      title: 'Order via WhatsApp',
      description: 'Simple and direct ordering through WhatsApp chat',
    },
    {
      icon: Truck,
      title: 'Fast Delivery',
      description: 'Quick shipping to your doorstep',
    },
    {
      icon: Shield,
      title: 'Secure Payment',
      description: 'Safe and trusted payment methods',
    },
    {
      icon: Clock,
      title: '24/7 Support',
      description: 'Always here to help you',
    },
  ];

  const products = [
    { name: 'Premium Watch', price: '₹2,999', image: watch1 },
    { name: 'Luxury Watch', price: '₹3,499', image: watch2 },
    { name: 'Sport Watch', price: '₹2,499', image: watch3 },
    { name: 'Classic Watch', price: '₹2,799', image: watch4 },
    { name: 'Casual Sneakers', price: '₹1,999', image: shoe1 },
    { name: 'Running Shoes', price: '₹2,299', image: shoe2 },
    { name: 'Casual Shirt', price: '₹899', image: casualShirt },
    { name: 'Wireless Earbuds', price: '₹1,499', image: earbuds },
  ];

  const handleWhatsAppOrder = (productName?: string) => {
    const message = productName
      ? `Hi! I'm interested in ordering ${productName} from House Of Styles.`
      : "Hi! I'm interested in your products from House Of Styles.";
    window.open(`${whatsappLink}?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-background border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="bg-gradient-hero text-primary-foreground px-3 py-1.5 rounded-lg font-bold text-xl">
              House Of Styles
            </div>
            <nav className="hidden md:flex items-center space-x-6">
              <a href="#categories" className="text-muted-foreground hover:text-primary transition-colors">
                Categories
              </a>
              <a href="#products" className="text-muted-foreground hover:text-primary transition-colors">
                Products
              </a>
              <a href="#about" className="text-muted-foreground hover:text-primary transition-colors">
                About
              </a>
              <a href="#contact" className="text-muted-foreground hover:text-primary transition-colors">
                Contact
              </a>
            </nav>
            <Link to="/login">
              <Button className="bg-gradient-button hover:bg-primary-hover">
                Login / Sign Up
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-hero py-20 md:py-32">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 animate-fade-in">
            Shop Anything You Need – Order Directly on WhatsApp
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto animate-fade-in">
            Fast delivery, trusted products, and customer-friendly shopping.
          </p>
          <Button
            size="lg"
            className="bg-green-500 hover:bg-green-600 text-white text-lg px-8 py-6 animate-scale-in"
            onClick={() => handleWhatsAppOrder()}
          >
            <MessageCircle className="mr-2 h-6 w-6" />
            Order on WhatsApp
          </Button>
        </div>
      </section>

      {/* Categories Section */}
      <section id="categories" className="py-16 bg-secondary">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Our Categories
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {categories.map((category) => (
              <Card
                key={category.name}
                className="p-6 text-center hover:shadow-lg transition-all cursor-pointer hover-scale"
              >
                <category.icon className="h-12 w-12 mx-auto mb-4 text-primary" />
                <h3 className="font-semibold text-lg">{category.name}</h3>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Why Choose Us
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature) => (
              <Card key={feature.title} className="p-6 text-center hover:shadow-lg transition-all hover-scale">
                <feature.icon className="h-12 w-12 mx-auto mb-4 text-primary" />
                <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                <p className="text-muted-foreground text-sm">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Product Gallery */}
      <section id="products" className="py-16 bg-secondary">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Featured Products
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <Card key={product.name} className="overflow-hidden hover:shadow-lg transition-all hover-scale">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
                  <p className="text-primary font-bold text-xl mb-3">{product.price}</p>
                  <Button
                    className="w-full bg-green-500 hover:bg-green-600"
                    onClick={() => handleWhatsAppOrder(product.name)}
                  >
                    <MessageCircle className="mr-2 h-4 w-4" />
                    Order Now
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section id="about" className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">About House Of Styles</h2>
            <p className="text-lg text-muted-foreground mb-4">
              Welcome to House Of Styles, your trusted destination for premium imported products. 
              We specialize in bringing you the finest watches, fashion items, electronics, and lifestyle products 
              from around the world.
            </p>
            <p className="text-lg text-muted-foreground mb-4">
              Our mission is to provide high-quality products with exceptional customer service. 
              We believe in making shopping convenient and hassle-free through our WhatsApp ordering system, 
              ensuring fast delivery and secure payments.
            </p>
            <p className="text-lg text-muted-foreground">
              With a commitment to quality and customer satisfaction, we've become the preferred choice 
              for customers looking for authentic imported products at competitive prices.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 bg-secondary">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Get In Touch
          </h2>
          <div className="max-w-2xl mx-auto text-center space-y-6">
            <Button
              size="lg"
              className="bg-green-500 hover:bg-green-600 text-white text-lg px-8 py-6"
              onClick={() => handleWhatsAppOrder()}
            >
              <MessageCircle className="mr-2 h-6 w-6" />
              Chat on WhatsApp
            </Button>
            <div className="flex flex-col md:flex-row justify-center items-center gap-6 text-muted-foreground">
              <div>
                <p className="font-semibold">Email</p>
                <p>houseofstyles2021@gmail.com</p>
              </div>
              <div>
                <p className="font-semibold">Phone</p>
                <p>+91 9885522948</p>
              </div>
              <div>
                <p className="font-semibold">Location</p>
                <p>India</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-background border-t py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} House Of Styles. All rights reserved.
            </p>
            <div className="flex space-x-6 text-sm text-muted-foreground">
              <Link to="/privacy-policy" className="hover:text-primary transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms-of-service" className="hover:text-primary transition-colors">
                Terms of Service
              </Link>
              <Link to="/shipping-info" className="hover:text-primary transition-colors">
                Shipping Info
              </Link>
              <Link to="/returns-refunds" className="hover:text-primary transition-colors">
                Returns & Refunds
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
