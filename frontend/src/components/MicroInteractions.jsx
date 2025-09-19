import React, { useEffect } from 'react';

const MicroInteractions = () => {
  useEffect(() => {
    // Add hover sound effects to buttons
    const addHoverEffects = () => {
      const buttons = document.querySelectorAll('button, .btn, [role="button"]');
      
      buttons.forEach(button => {
        // Add hover sound effect
        button.addEventListener('mouseenter', () => {
          if (window.playHoverSound) {
            window.playHoverSound();
          }
          
          // Add subtle scale effect
          button.style.transition = 'transform 0.2s ease-in-out';
          button.addEventListener('mouseenter', () => {
            button.style.transform = 'scale(1.05)';
          });
          
          button.addEventListener('mouseleave', () => {
            button.style.transform = 'scale(1)';
          });
        });

        // Add click sound effect
        button.addEventListener('click', () => {
          if (window.playClickSound) {
            window.playClickSound();
          }
          
          // Add click animation
          button.style.transform = 'scale(0.95)';
          setTimeout(() => {
            button.style.transform = 'scale(1.05)';
            setTimeout(() => {
              button.style.transform = 'scale(1)';
            }, 100);
          }, 100);
        });
      });
    };

    // Add smooth scroll behavior
    const addSmoothScroll = () => {
      document.documentElement.style.scrollBehavior = 'smooth';
    };

    // Add loading animations to images
    const addImageLoadingEffects = () => {
      const images = document.querySelectorAll('img');
      
      images.forEach(img => {
        img.style.transition = 'opacity 0.3s ease-in-out';
        img.style.opacity = '0';
        
        img.addEventListener('load', () => {
          img.style.opacity = '1';
        });
        
        img.addEventListener('error', () => {
          img.style.opacity = '0.5';
        });
      });
    };

    // Add form input animations
    const addFormAnimations = () => {
      const inputs = document.querySelectorAll('input, textarea, select');
      
      inputs.forEach(input => {
        input.addEventListener('focus', () => {
          input.style.transform = 'scale(1.02)';
          input.style.transition = 'transform 0.2s ease-in-out';
        });
        
        input.addEventListener('blur', () => {
          input.style.transform = 'scale(1)';
        });
      });
    };

    // Add card hover effects
    const addCardEffects = () => {
      const cards = document.querySelectorAll('.card, [class*="card"]');
      
      cards.forEach(card => {
        card.style.transition = 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out';
        
        card.addEventListener('mouseenter', () => {
          card.style.transform = 'translateY(-5px)';
          card.style.boxShadow = '0 10px 25px rgba(0,0,0,0.1)';
        });
        
        card.addEventListener('mouseleave', () => {
          card.style.transform = 'translateY(0)';
          card.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)';
        });
      });
    };

    // Initialize all effects
    addHoverEffects();
    addSmoothScroll();
    addImageLoadingEffects();
    addFormAnimations();
    addCardEffects();

    // Re-run effects when new content is added
    const observer = new MutationObserver(() => {
      addHoverEffects();
      addImageLoadingEffects();
      addFormAnimations();
      addCardEffects();
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  return null; // This component doesn't render anything
};

export default MicroInteractions;

