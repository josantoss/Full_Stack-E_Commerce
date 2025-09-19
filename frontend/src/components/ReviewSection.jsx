import React, { useState, useEffect } from 'react';
import { FaStar, FaUser, FaEdit, FaTrash, FaThumbsUp } from 'react-icons/fa';
import { toast } from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';
import reviewService from '../services/reviewService';

const ReviewSection = ({ productId }) => {
  const [reviews, setReviews] = useState([]);
  const [ratingStats, setRatingStats] = useState(null);
  const [hasUserReviewed, setHasUserReviewed] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [reviewForm, setReviewForm] = useState({ rating: 5, review_text: '' });
  const [editingReview, setEditingReview] = useState(null);
  const { user, isAuthenticated } = useAuth();

  useEffect(() => {
    loadReviews();
    loadRatingStats();
    if (isAuthenticated) {
      checkUserReview();
    }
  }, [productId, isAuthenticated]);

  const loadReviews = async () => {
    try {
      const response = await reviewService.getProductReviews(productId);
      setReviews(response.data.reviews || []);
    } catch (error) {
      console.error('Failed to load reviews:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadRatingStats = async () => {
    try {
      const response = await reviewService.getProductRatingStats(productId);
      setRatingStats(response.data);
    } catch (error) {
      console.error('Failed to load rating stats:', error);
    }
  };

  const checkUserReview = async () => {
    try {
      const response = await reviewService.checkUserReview(productId);
      setHasUserReviewed(response.data.hasReviewed);
    } catch (error) {
      console.error('Failed to check user review:', error);
    }
  };

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    if (!isAuthenticated) {
      toast.error('Please login to write a review');
      return;
    }

    try {
      if (editingReview) {
        await reviewService.updateReview(editingReview.id, reviewForm);
        toast.success('Review updated successfully');
      } else {
        await reviewService.createReview(productId, reviewForm);
        toast.success('Review submitted successfully');
      }
      
      setReviewForm({ rating: 5, review_text: '' });
      setShowReviewForm(false);
      setEditingReview(null);
      setHasUserReviewed(true);
      loadReviews();
      loadRatingStats();
    } catch (error) {
      toast.error(error.message || 'Failed to submit review');
    }
  };

  const handleEditReview = (review) => {
    setEditingReview(review);
    setReviewForm({ rating: review.rating, review_text: review.review_text || '' });
    setShowReviewForm(true);
  };

  const handleDeleteReview = async (reviewId) => {
    if (!window.confirm('Are you sure you want to delete this review?')) {
      return;
    }

    try {
      await reviewService.deleteReview(reviewId);
      toast.success('Review deleted successfully');
      setHasUserReviewed(false);
      loadReviews();
      loadRatingStats();
    } catch (error) {
      toast.error(error.message || 'Failed to delete review');
    }
  };

  const renderStars = (rating, interactive = false, onRatingChange = null) => {
    return (
      <div className="flex items-center">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type={interactive ? "button" : undefined}
            onClick={interactive ? () => onRatingChange(star) : undefined}
            className={`${interactive ? 'cursor-pointer' : 'cursor-default'}`}
            disabled={!interactive}
          >
            <FaStar
              className={`w-5 h-5 ${
                star <= rating
                  ? 'text-yellow-400'
                  : 'text-gray-300'
              }`}
            />
          </button>
        ))}
      </div>
    );
  };

  const renderRatingDistribution = () => {
    if (!ratingStats || !ratingStats.rating_distribution) return null;

    const total = ratingStats.total_reviews;
    if (total === 0) return null;

    return (
      <div className="space-y-2">
        {[5, 4, 3, 2, 1].map((rating) => {
          const count = ratingStats.rating_distribution[rating] || 0;
          const percentage = total > 0 ? (count / total) * 100 : 0;
          
          return (
            <div key={rating} className="flex items-center gap-2">
              <span className="text-sm font-medium w-8">{rating}</span>
              <FaStar className="w-4 h-4 text-yellow-400" />
              <div className="flex-1 bg-gray-200 rounded-full h-2">
                <div
                  className="bg-yellow-400 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${percentage}%` }}
                ></div>
              </div>
              <span className="text-sm text-gray-600 w-8">{count}</span>
            </div>
          );
        })}
      </div>
    );
  };

  if (loading) {
    return (
      <div className="animate-pulse">
        <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
        <div className="space-y-4">
          {[...Array(3)].map((_, index) => (
            <div key={index} className="bg-gray-100 rounded-lg p-4">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
                <div className="space-y-1">
                  <div className="h-4 bg-gray-200 rounded w-24"></div>
                  <div className="h-3 bg-gray-200 rounded w-16"></div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="h-4 bg-gray-200 rounded w-full"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Rating Overview */}
      {ratingStats && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-semibold mb-4">Customer Reviews</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="text-center">
              <div className="text-4xl font-bold text-gray-900 mb-2">
                {ratingStats.average_rating}
              </div>
              <div className="flex justify-center mb-2">
                {renderStars(Math.round(parseFloat(ratingStats.average_rating)))}
              </div>
              <div className="text-sm text-gray-600">
                Based on {ratingStats.total_reviews} review{ratingStats.total_reviews !== 1 ? 's' : ''}
              </div>
            </div>
            <div>
              <h4 className="font-medium mb-3">Rating Distribution</h4>
              {renderRatingDistribution()}
            </div>
          </div>
        </div>
      )}

      {/* Review Form */}
      {isAuthenticated && !hasUserReviewed && !showReviewForm && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <button
            onClick={() => setShowReviewForm(true)}
            className="w-full py-3 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Write a Review
          </button>
        </div>
      )}

      {showReviewForm && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold mb-4">
            {editingReview ? 'Edit Review' : 'Write a Review'}
          </h3>
          <form onSubmit={handleSubmitReview} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Rating
              </label>
              {renderStars(reviewForm.rating, true, (rating) =>
                setReviewForm(prev => ({ ...prev, rating }))
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Review
              </label>
              <textarea
                value={reviewForm.review_text}
                onChange={(e) => setReviewForm(prev => ({ ...prev, review_text: e.target.value }))}
                placeholder="Share your experience with this product..."
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                rows={4}
              />
            </div>
            <div className="flex gap-3">
              <button
                type="submit"
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                {editingReview ? 'Update Review' : 'Submit Review'}
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowReviewForm(false);
                  setEditingReview(null);
                  setReviewForm({ rating: 5, review_text: '' });
                }}
                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Reviews List */}
      <div className="space-y-4">
        {reviews.length === 0 ? (
          <div className="text-center py-8">
            <div className="text-gray-400 text-4xl mb-2">⭐</div>
            <p className="text-gray-600">No reviews yet. Be the first to review this product!</p>
          </div>
        ) : (
          reviews.map((review) => (
            <div key={review.id} className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                    <FaUser className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">{review.user_name}</div>
                    <div className="flex items-center gap-2">
                      {renderStars(review.rating)}
                      <span className="text-sm text-gray-500">
                        {new Date(review.created_at).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
                {user && user.id === review.user_id && (
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEditReview(review)}
                      className="p-2 text-gray-400 hover:text-blue-600 transition-colors"
                      title="Edit review"
                    >
                      <FaEdit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteReview(review.id)}
                      className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                      title="Delete review"
                    >
                      <FaTrash className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>
              {review.review_text && (
                <p className="text-gray-700 leading-relaxed">{review.review_text}</p>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ReviewSection;
