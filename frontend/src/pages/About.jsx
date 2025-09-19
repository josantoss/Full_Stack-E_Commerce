import React from 'react';
import { FaUsers, FaBullseye, FaAward, FaGlobe, FaHeart, FaShieldAlt, FaRocket, FaHandshake } from 'react-icons/fa';

const About = () => {
  const teamMembers = [
    {
      name: "Yosef Agegnehu",
      role: "Founder & CEO",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face",
      description: "Visionary leader with 10+ years in e-commerce and technology innovation."
    },
    {
      name: "Sarah Johnson",
      role: "CTO",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=300&h=300&fit=crop&crop=face",
      description: "Technology expert passionate about building scalable and secure platforms."
    },
    {
      name: "Michael Chen",
      role: "Head of Operations",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face",
      description: "Operations specialist ensuring smooth logistics and customer satisfaction."
    },
    {
      name: "Amina Hassan",
      role: "Marketing Director",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop&crop=face",
      description: "Creative marketer connecting brands with customers across Ethiopia."
    }
  ];

  const values = [
    {
      icon: <FaHeart className="w-8 h-8" />,
      title: "Customer First",
      description: "Every decision we make is guided by what's best for our customers. Their satisfaction is our success."
    },
    {
      icon: <FaShieldAlt className="w-8 h-8" />,
      title: "Trust & Security",
      description: "We prioritize the security of your data and transactions, ensuring a safe shopping experience."
    },
    {
      icon: <FaRocket className="w-8 h-8" />,
      title: "Innovation",
      description: "We continuously innovate to bring you the latest technology and shopping experiences."
    },
    {
      icon: <FaHandshake className="w-8 h-8" />,
      title: "Partnership",
      description: "We build strong partnerships with local and international brands to offer you the best products."
    }
  ];

  const milestones = [
    {
      year: "2020",
      title: "Company Founded",
      description: "AradaBuy was established with a vision to revolutionize e-commerce in Ethiopia."
    },
    {
      year: "2021",
      title: "First 1000 Customers",
      description: "Reached our first milestone of 1000 satisfied customers across Addis Ababa."
    },
    {
      year: "2022",
      title: "National Expansion",
      description: "Expanded our services to major cities across Ethiopia, serving customers nationwide."
    },
    {
      year: "2023",
      title: "Mobile App Launch",
      description: "Launched our mobile application, making shopping even more convenient for our customers."
    },
    {
      year: "2024",
      title: "100,000+ Customers",
      description: "Celebrated serving over 100,000 customers with a growing catalog of premium products."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold mb-6">About AradaBuy</h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
            We're more than just an e-commerce platform. We're your trusted partner in discovering 
            quality products, exceptional service, and innovative shopping experiences across Ethiopia.
          </p>
        </div>
      </div>

      {/* Our Story Section */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Story</h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  Founded in 2020 by Yosef Agegnehu, AradaBuy began as a vision to transform 
                  the shopping experience in Ethiopia. We recognized the need for a reliable, 
                  user-friendly platform that connects customers with quality products from 
                  trusted brands.
                </p>
                <p>
                  Starting from a small office in Addis Ababa, we've grown to become one of 
                  Ethiopia's leading e-commerce platforms, serving over 100,000 customers 
                  nationwide. Our journey has been marked by continuous innovation, customer 
                  satisfaction, and community building.
                </p>
                <p>
                  Today, AradaBuy stands as a testament to Ethiopian entrepreneurship and 
                  technological advancement, bringing the world's best products to your doorstep 
                  while supporting local businesses and communities.
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl p-8">
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-600 mb-2">100K+</div>
                    <div className="text-gray-600">Happy Customers</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-purple-600 mb-2">50K+</div>
                    <div className="text-gray-600">Products</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-pink-600 mb-2">15+</div>
                    <div className="text-gray-600">Cities Served</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-600 mb-2">99%</div>
                    <div className="text-gray-600">Satisfaction Rate</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mission & Vision Section */}
      <div className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Mission & Vision</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We're committed to building a better future for e-commerce in Ethiopia
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                  <FaBullseye className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Our Mission</h3>
              </div>
              <p className="text-gray-600 leading-relaxed">
                To democratize access to quality products and exceptional shopping experiences 
                across Ethiopia. We strive to connect customers with the best brands, provide 
                reliable delivery services, and support local businesses in their digital 
                transformation journey.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mr-4">
                  <FaGlobe className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Our Vision</h3>
              </div>
              <p className="text-gray-600 leading-relaxed">
                To become the leading e-commerce platform in East Africa, known for innovation, 
                customer satisfaction, and community impact. We envision a future where every 
                Ethiopian has access to quality products and seamless shopping experiences.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Values</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              The principles that guide everything we do
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="text-center group">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-6 text-white group-hover:scale-110 transition-transform duration-300">
                  {value.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">{value.title}</h3>
                <p className="text-gray-600 leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Meet Our Team</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              The passionate people behind AradaBuy's success
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 shadow-lg text-center group hover:shadow-xl transition-shadow duration-300">
                <div className="w-24 h-24 rounded-full overflow-hidden mx-auto mb-4">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{member.name}</h3>
                <p className="text-blue-600 font-medium mb-3">{member.role}</p>
                <p className="text-gray-600 text-sm leading-relaxed">{member.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Timeline Section */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Journey</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Key milestones in our growth story
            </p>
          </div>

          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-blue-500 to-purple-500"></div>
            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <div key={index} className={`flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
                  <div className={`w-1/2 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8 text-left'}`}>
                    <div className="bg-white rounded-lg p-6 shadow-lg">
                      <div className="text-2xl font-bold text-blue-600 mb-2">{milestone.year}</div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">{milestone.title}</h3>
                      <p className="text-gray-600">{milestone.description}</p>
                    </div>
                  </div>
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center relative z-10">
                    <FaAward className="w-4 h-4 text-white" />
                  </div>
                  <div className="w-1/2"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">Join Our Journey</h2>
          <p className="text-xl text-blue-100 mb-8 leading-relaxed">
            Be part of Ethiopia's e-commerce revolution. Whether you're a customer looking for 
            quality products or a business wanting to reach more customers, we're here to help.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/products"
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-300"
            >
              Start Shopping
            </a>
            <a
              href="/contact"
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors duration-300"
            >
              Partner With Us
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
