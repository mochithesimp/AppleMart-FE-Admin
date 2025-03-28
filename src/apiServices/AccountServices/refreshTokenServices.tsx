import swal from 'sweetalert';
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
export const refreshToken = async () => {

    const token = localStorage.getItem('token');
    const rfToken = localStorage.getItem('refreshToken');
    if (!token || !rfToken) {
        console.error("Token hoặc Refresh Token không tồn tại!");
        return;
    }
    
    const data = {
        accessToken: token,
        refreshToken: rfToken
    };
    try {
        const response = await fetch(`${API_BASE_URL}/api/Account/refresh-token`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });
        if (response.ok) {
            const responseServer = await response.json();
            const newToken = responseServer.accessToken;
            const newRefreshToken = responseServer.refreshToken;
           
            localStorage.setItem('token', newToken);
            localStorage.setItem("refreshToken", newRefreshToken);
            return newToken;
        } else if (response.status === 401) {
            swal({
                title: "Your section had ended!!!",
                text: "Please login again",
                icon: "error",
                buttons: {
                    ok: {
                        text: "OK",
                        value: true,
                        className: "swal-ok-button",
                    }
                },
            }).then((value) => {
                if (value) {
                    localStorage.removeItem("token");
                    localStorage.removeItem("refreshToken");
                    location.href = "/login"
                }
            });
        } else {
            throw new Error('Failed to refresh token.');
        }
    } catch (error) {
        console.log(error);
        throw error;
    }
};