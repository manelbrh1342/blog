from flask import Flask, jsonify, request
from flask_cors import CORS
import random

app = Flask(__name__)
CORS(app)

@app.route('/')
def home():
    return "Backend is running! Access stats at /api/stats"

@app.route('/api/stats', methods=['GET'])
def get_stats():
    # Simulate different data based on user_id if provided, otherwise random
    user_id = request.args.get('userId')
    
    # Helper to generate random trend
    def get_trend():
        return random.choice(['up', 'down', 'neutral'])

    # Helper to generate random percentage
    def get_percentage():
        return f"{random.choice(['+', '-'])}{random.uniform(0.1, 20.0):.2f}%"

    activity_data = [
        { "name": 'Jan', "thisYear": random.randint(5, 25), "lastYear": random.randint(5, 25) },
        { "name": 'Feb', "thisYear": random.randint(5, 25), "lastYear": random.randint(5, 25) },
        { "name": 'Mar', "thisYear": random.randint(5, 25), "lastYear": random.randint(5, 25) },
        { "name": 'Apr', "thisYear": random.randint(5, 25), "lastYear": random.randint(5, 25) },
        { "name": 'May', "thisYear": random.randint(5, 25), "lastYear": random.randint(5, 25) },
        { "name": 'Jun', "thisYear": random.randint(5, 25), "lastYear": random.randint(5, 25) },
        { "name": 'Jul', "thisYear": random.randint(5, 25), "lastYear": random.randint(5, 25) },
    ]

    category_data = [
        { "name": 'Lifestyle', "count": random.randint(5000, 30000) },
        { "name": 'Health', "count": random.randint(5000, 30000) },
        { "name": 'Game', "count": random.randint(5000, 30000) },
        { "name": 'Tech', "count": random.randint(5000, 30000) },
        { "name": 'Travel', "count": random.randint(5000, 30000) },
        { "name": 'Sport', "count": random.randint(5000, 30000) },
    ]

    # Ensure percentages sum to roughly 100 (simplified)
    v1 = random.uniform(10, 60)
    v2 = random.uniform(10, 100 - v1)
    v3 = random.uniform(5, 100 - v1 - v2)
    v4 = 100 - v1 - v2 - v3
    
    status_data = [
        { "name": 'Published Articles', "value": round(v1, 1), "color": '#1F2937' },
        { "name": 'Draft Articles', "value": round(v2, 1), "color": '#93C5FD' },
        { "name": 'Scheduled Articles', "value": round(v3, 1), "color": '#86EFAC' },
        { "name": 'Archived Articles', "value": round(v4, 1), "color": '#A5B4FC' },
    ]
    
    summary_cards = [
        { "title": "Views", "value": f"{random.randint(1000, 10000):,}", "percentage": get_percentage(), "trend": get_trend() },
        { "title": "Visits", "value": f"{random.randint(1000, 5000):,}", "percentage": get_percentage(), "trend": get_trend() },
        { "title": "New likes", "value": f"{random.randint(50, 500):,}", "percentage": get_percentage(), "trend": get_trend() },
        { "title": "New Comments", "value": f"{random.randint(100, 3000):,}", "percentage": get_percentage(), "trend": get_trend() }
    ]

    return jsonify({
        "activityData": activity_data,
        "categoryData": category_data,
        "statusData": status_data,
        "summaryCards": summary_cards
    })

if __name__ == '__main__':
    app.run(debug=True, port=5000)
