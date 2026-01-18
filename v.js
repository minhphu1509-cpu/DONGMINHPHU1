/**
 * Core Logic for Public and Admin Interface
 */

// Default Configuration Seeder
const DEFAULT_CONFIG = {
    brandName: "ĐỒNG MINH PHÚ. Ai",
    adminPass: "Phu@1976",
    contactPhone: "+84 766771509",
    contactEmail: "dmpaidev@gmail.com",
    heroTitle: "Giải Pháp AI Đột Phá",
    heroSubtitle: "Nâng tầm doanh nghiệp Việt với công nghệ trí tuệ nhân tạo tiên tiến. Tối ưu hóa vận hành, gia tăng lợi nhuận.",
    logo: "",
    heroImage: "" 
};

/**
 * Public Facing Logic (index.html)
 */
function appCore() {
    return {
        config: { ...DEFAULT_CONFIG },
        form: {
            name: '',
            phone: '',
            message: ''
        },
        formStatus: {
            show: false,
            success: false,
            message: ''
        },

        initApp() {
            const savedConfig = localStorage.getItem('siteConfig');
            if (savedConfig) {
                this.config = JSON.parse(savedConfig);
            } else {
                // Initialize LS if empty
                localStorage.setItem('siteConfig', JSON.stringify(this.config));
            }
        },

        submitContact() {
            // Basic validation
            if (!this.form.name || !this.form.phone) return;

            const newLead = {
                id: Date.now(),
                name: this.form.name,
                phone: this.form.phone,
                message: this.form.message,
                date: new Date().toLocaleString('vi-VN')
            };

            // Get existing leads
            let leads = JSON.parse(localStorage.getItem('siteLeads') || '[]');
            leads.unshift(newLead);
            localStorage.setItem('siteLeads', JSON.stringify(leads));

            // UI Feedback
            this.formStatus = { show: true, success: true, message: 'Đã gửi thông tin thành công! Chúng tôi sẽ liên hệ sớm.' };
            this.form = { name: '', phone: '', message: '' };

            setTimeout(() => {
                this.formStatus.show = false;
            }, 5000);
        }
    };
}

/**
 * Admin Panel Logic (admin.html)
 */
function adminCore() {
    return {
        isAuth: false,
        passwordInput: '',
        loginError: false,
        currentTab: 'dashboard',
        config: { ...DEFAULT_CONFIG },
        leads: [],
        isSaving: false,
        
        tabs: [
            { id: 'dashboard', label: 'Tổng quan', icon: '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path></svg>' },
            { id: 'content', label: 'Nội dung & Hình ảnh', icon: '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>' },
            { id: 'leads', label: 'Khách hàng', icon: '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>' },
            { id: 'settings', label: 'Cài đặt', icon: '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>' }
        ],

        initAdmin() {
            // Load Config
            const savedConfig = localStorage.getItem('siteConfig');
            if (savedConfig) {
                this.config = JSON.parse(savedConfig);
            }
            
            // Load Leads
            this.loadLeads();

            // Check Session (Simple simulation)
            if (sessionStorage.getItem('adminAuth') === 'true') {
                this.isAuth = true;
            }
        },

        loadLeads() {
            this.leads = JSON.parse(localStorage.getItem('siteLeads') || '[]');
        },

        login() {
            if (this.passwordInput === this.config.adminPass) {
                this.isAuth = true;
                this.loginError = false;
                sessionStorage.setItem('adminAuth', 'true');
                this.passwordInput = '';
            } else {
                this.loginError = true;
            }
        },

        logout() {
            this.isAuth = false;
            sessionStorage.removeItem('adminAuth');
        },

        saveChanges() {
            this.isSaving = true;
            localStorage.setItem('siteConfig', JSON.stringify(this.config));
            setTimeout(() => {
                this.isSaving = false;
                alert('Đã lưu thay đổi thành công!');
            }, 800);
        },

        processImage(event, targetKey) {
            const file = event.target.files[0];
            if (!file) return;

            // Limit file size to avoid LocalStorage Quota Exceeded (approx 5MB limit usually)
            if (file.size > 2 * 1024 * 1024) {
                alert("File ảnh quá lớn (giới hạn 2MB cho demo này). Vui lòng chọn ảnh nhỏ hơn.");
                return;
            }

            const reader = new FileReader();
            reader.onload = (e) => {
                this.config[targetKey] = e.target.result;
            };
            reader.readAsDataURL(file);
        },

        deleteLead(index) {
            if(confirm('Bạn có chắc muốn xóa liên hệ này?')) {
                this.leads.splice(index, 1);
                localStorage.setItem('siteLeads', JSON.stringify(this.leads));
            }
        }
    };
}