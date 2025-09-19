import React, { useState } from 'react';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaClock, FaPaperPlane } from 'react-icons/fa';
import { toast } from 'react-hot-toast';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Here you would typically send the form data to your backend
      // For now, we'll simulate a successful submission
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast.success('Message sent successfully! We\'ll get back to you soon.');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      toast.error('Failed to send message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const contactInfo = [
    {
      icon: <FaMapMarkerAlt className="w-6 h-6" />,
      title: 'Head Office',
      content: 'Dembel City Center, 3rd Floor\nAddis Ababa, Ethiopia\nP.O. Box 12345'
    },
    {
      icon: <FaPhone className="w-6 h-6" />,
      title: 'Phone Numbers',
      content: 'Main: +251 11 123 4567\nMobile: +251 93 409 9170\nToll Free: +251 800 123 456'
    },
    {
      icon: <FaEnvelope className="w-6 h-6" />,
      title: 'Email Addresses',
      content: 'General: info@aradabuy.com\nSupport: support@aradabuy.com\nSales: sales@aradabuy.com'
    },
    {
      icon: <FaClock className="w-6 h-6" />,
      title: 'Business Hours',
      content: 'Monday - Friday: 8:00 AM - 6:00 PM\nSaturday: 9:00 AM - 4:00 PM\nSunday: Closed'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Contact AradaBuy</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            We're here to help! Whether you have questions about our products, need support with an order, or want to partner with us, we'd love to hear from you. Our team is committed to providing excellent customer service.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-semibold mb-6">Send us a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                    placeholder="Enter your full name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                    placeholder="Enter your email address"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                  Subject *
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  placeholder="What is this about?"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="6"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors resize-none"
                  placeholder="Tell us more about your inquiry..."
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <>
                    <FaPaperPlane className="mr-2" />
                    Send Message
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-semibold mb-6">Get in Touch</h2>
              <p className="text-gray-600 mb-8">
                Connect with us through multiple channels. Our customer service team is available to assist you with any inquiries, technical support, or business partnerships. We typically respond within 24 hours during business days.
              </p>
              
              {/* Social Media Links */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
                <div className="flex space-x-4">
                  <a href="#" className="w-10 h-10 bg-blue-600 text-white rounded-lg flex items-center justify-center hover:bg-blue-700 transition-colors">
                    <span className="text-sm font-semibold">f</span>
                  </a>
                  <a href="#" className="w-10 h-10 bg-blue-400 text-white rounded-lg flex items-center justify-center hover:bg-blue-500 transition-colors">
                    <span className="text-sm font-semibold">t</span>
                  </a>
                  <a href="#" className="w-10 h-10 bg-pink-600 text-white rounded-lg flex items-center justify-center hover:bg-pink-700 transition-colors">
                    <span className="text-sm font-semibold">ig</span>
                  </a>
                  <a href="#" className="w-10 h-10 bg-blue-800 text-white rounded-lg flex items-center justify-center hover:bg-blue-900 transition-colors">
                    <span className="text-sm font-semibold">in</span>
                  </a>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              {contactInfo.map((info, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600">
                    {info.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">{info.title}</h3>
                    <p className="text-gray-600 whitespace-pre-line">{info.content}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Map Placeholder */}
            <div className="bg-gray-200 rounded-lg h-64 flex items-center justify-center">
              <div className="text-center text-gray-500">
                <FaMapMarkerAlt className="w-12 h-12 mx-auto mb-2" />
                <p>Interactive Map</p>
                <p className="text-sm">(Map integration would go here)</p>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-20">
          <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-lg font-semibold mb-3">How can I track my order?</h3>
              <p className="text-gray-600">
                Once your order ships, you'll receive a tracking number via email and SMS. You can also check your order status in your account dashboard or contact our support team.
              </p>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-lg font-semibold mb-3">What is your return and exchange policy?</h3>
              <p className="text-gray-600">
                We offer a 30-day return policy for most items. Products must be in original condition with all packaging intact. Exchanges are available for defective items.
              </p>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-lg font-semibold mb-3">Do you deliver throughout Ethiopia?</h3>
              <p className="text-gray-600">
                Yes, we deliver to all major cities and towns in Ethiopia. Delivery times vary by location, with Addis Ababa deliveries typically within 1-2 business days.
              </p>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-lg font-semibold mb-3">What payment methods do you accept?</h3>
              <p className="text-gray-600">
                We accept cash on delivery, bank transfers, mobile money (CBE Birr, M-Pesa), and major credit cards. All transactions are secure and encrypted.
              </p>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-lg font-semibold mb-3">How can I become a seller on AradaBuy?</h3>
              <p className="text-gray-600">
                We welcome new sellers! Contact our business development team at sales@aradabuy.com or call +251 11 123 4567 to learn about our seller program and requirements.
              </p>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-lg font-semibold mb-3">Do you offer bulk discounts?</h3>
              <p className="text-gray-600">
                Yes, we offer special pricing for bulk orders and business customers. Contact our sales team for custom quotes and volume discounts.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
