import swal from 'sweetalert';

export const refreshToken = async () => {

    const token = localStorage.getItem('token');
    const rfToken = localStorage.getItem('refreshToken');
    const data = {
        token: token,
        refreshToken: rfToken
    };
    try {
        const response = await fetch('https://localhost:7140/api/Account/refresh-token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });
        if (response.ok) {
            const responseServer = await response.json();
            const data = responseServer.data;
            const newToken = data.token;
            localStorage.setItem('token', newToken);
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
                    // localStorage.removeItem("cart");
                    location.href = "/login"
                }
            })
        } else {
            throw new Error('Failed to refresh token.');
        }
    } catch (error) {
        console.log(error);
        throw error;
    }
};