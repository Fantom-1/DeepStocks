// Profile Popup Functionality
document.addEventListener('DOMContentLoaded', function() {
    const UserProfile= document.getElementById('userProfile')
    const profileLink = document.getElementById('sidebarProfileLink');
    const profilePopup = document.getElementById('profilePopup');
    const closeProfilePopup = document.getElementById('closeProfilePopup');
    
    if (profileLink && profilePopup || UserProfile) {
        // Toggle profile popup when clicking profile link in sidebar
        UserProfile.addEventListener('click', function(e) {
            e.preventDefault();
            profilePopup.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        });


        profileLink.addEventListener('click', function(e) {
            e.preventDefault();
            profilePopup.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        });
        
        // Close popup when clicking close button
        closeProfilePopup.addEventListener('click', function() {
            profilePopup.style.display = 'none';
            document.body.style.overflow = 'auto';
        });
        
        // Close popup when clicking outside
        profilePopup.addEventListener('click', function(e) {
            if (e.target === profilePopup) {
                profilePopup.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });
        
        // Close popup with ESC key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && profilePopup.style.display === 'flex') {
                profilePopup.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });
    }
});