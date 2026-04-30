const BASE_URL = 'http://localhost:8000/api';

const getHeaders = (isFormData = false) => {
    const token = localStorage.getItem('token');
    const headers = {
        'Accept': 'application/json',
        'Authorization': token ? `Bearer ${token}` : '',
    };
    
    // 💡 لو الداتا مش FormData، حط الـ Content-Type كـ JSON
    // لو FormData، سيبها فاضية عشان المتصفح يحط الـ Boundary الصح
    if (!isFormData) {
        headers['Content-Type'] = 'application/json';
    }
    
    return headers;
};

export const api = {
    async get(endpoint, params = {}) { // 👈 أضفنا params هنا
        // تحويل الـ Object لـ Query String (مثلاً: ?month=4&year=2026)
        const queryString = Object.keys(params).length 
            ? '?' + new URLSearchParams(params).toString() 
            : '';

        const response = await fetch(`${BASE_URL}${endpoint}${queryString}`, { // 👈 أضفنا الـ queryString هنا
            headers: getHeaders() 
        });

        if (response.status === 401) {
            localStorage.removeItem('token');
            localStorage.removeItem('isAuthenticated');
            localStorage.removeItem('role');
            window.location.href = '/login';
            return null;
        }

        if (!response.ok) {
            const error = await response.json();
            throw error;
        }

        return response.json();
    },
  

    async post(endpoint, data) {
        const isFormData = data instanceof FormData;
        
        const response = await fetch(`${BASE_URL}${endpoint}`, {
            method: 'POST',
            headers: getHeaders(isFormData),
            body: isFormData ? data : JSON.stringify(data), // 💡 هنا السر
        });

        if (!response.ok) {
            const error = await response.json();
            throw error; // 💡 ارمي الـ error كـ object مش كـ string
        }
        return response.json();
    },

    // طبق نفس المنطق على put و patch لو هتحتاج ترفع ملفات فيهم
    async put(endpoint, data) {
        const isFormData = data instanceof FormData;
        const response = await fetch(`${BASE_URL}${endpoint}`, {
            method: 'PUT',
            headers: getHeaders(isFormData),
            body: isFormData ? data : JSON.stringify(data),
        });
        if (!response.ok) {
            const error = await response.json();
            throw error;
        }
        return response.json();
    },
    
    // ... باقي الدوال بنفس النمط
};