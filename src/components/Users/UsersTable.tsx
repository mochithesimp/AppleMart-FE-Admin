import { motion } from "framer-motion";
import { Edit, Search, Save} from "lucide-react";
import { useEffect, useState } from "react";
import { iUser } from "../../interfaces";
import swal from "sweetalert";
import { getUser, updateUser } from "../../apiServices/UserServices/userServices";

const UsersTable = () => {
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [allUser, setAllUser] = useState<iUser[]>([]);
    const [editingUserId, setEditingUserId] = useState<string | null >(null);
    const [editedData, setEditedData] = useState<Partial<iUser>>({});

    // Get all user-------------------------------------------------
    useEffect(() => {
        const fetchData = async () => {
            const result = await getUser();
            if (result && result.$values) {
                setAllUser(result.$values);
            } else {
                console.error("Data not found or invalid response structure");
            }
        };
        fetchData();
    }, []);

    // delete product-----------------------------------------------------------
    // const deleteProduct = async (UserId: string) => {
    //     try {
    //         swal({
    //             title: "Are you sure you want to delete this user?",
    //             text: "This action cannot be undone!",
    //             icon: "warning",
    //             buttons: ["Cancel", "Confirm"],
    //             dangerMode: true,
    //         }).then(async (confirmDelete) => {
    //             if (confirmDelete) {
    //                 const response = await deleteUser(UserId);

    //                 if (response) {
    //                     swal("Success!", "User was deleted!", "success");
    //                     setAllUser(
    //                         allUser.filter((user) => user.id !== UserId)
    //                     );
    //                 } else {
    //                     throw new Error("Failed to delete user");
    //                 }
    //             }
    //         });
    //     } catch (error) {
    //         console.error("Error deleting notification:", error);
    //     }
    // };

    // handle edit -----------------------------------------------------------------
    const handleEditClick = (user: iUser) => {
        setEditingUserId(user.id);
        setEditedData({
            name: user.name,
            address: user.address,
            phoneNumber: user.phoneNumber,
            avatar: user.avatar,
        });
    };

    // handle save----------------------------------------------------------------------
    const handleSave = async (UserID: string) => {
        try {
            const response = await updateUser(UserID, editedData);
            if (response) {
                swal("Success!", "User updated!", "success").then(() => {
                    window.location.reload();
                });
            }
        } catch (error) {
            console.error("Error updating user:", error);
        }
    };

    // handle search ---------------------------------------------------------------------------
    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const term = e.target.value.toLowerCase();
        setSearchTerm(term);
        const filtered = allUser.filter((user) =>
            user.name.toLowerCase().includes(term)
        );
        setAllUser(filtered);
    };

    return (
        <motion.div
            className="products-container"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
        >
            <div className="products-header">
                <h2>User List</h2>
                <div style={{ display: "flex" }}>
                    <div className="search-box">
                        <input
                            type="text"
                            placeholder="Search users..."
                            onChange={handleSearch}
                            value={searchTerm}
                        />
                        <Search className="search-icon" size={18} />
                    </div>
                </div>
            </div>
            <div className="table-wrapper">
                <table className="products-table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>PhoneNumber</th>
                            <th>Address</th>
                            <th>Avatar</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {allUser.map((user, index) => (
                            <motion.tr
                                key={index}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.3 }}
                            >

                                <td className="product-name">
                                    {editingUserId === user.id ? (
                                        <input
                                            value={editedData.name || ""}
                                            onChange={(e) =>
                                                setEditedData({ ...editedData, name: e.target.value })
                                            }
                                        />
                                    ) : (
                                        <>
                                            {user.name}
                                        </>
                                    )}
                                </td>

                                <td>
                                    {user.email}
                                </td>

                                <td>
                                    {editingUserId === user.id ? (
                                        <input
                                            value={editedData.phoneNumber || ""}
                                            onChange={(e) =>
                                                setEditedData({
                                                    ...editedData,
                                                    address: e.target.value,
                                                })
                                            }
                                        />
                                    ) : (
                                        user.address
                                    )}
                                </td>

                                <td>
                                    {editingUserId === user.id ? (
                                        <input
                                            value={editedData.address || ""}
                                            onChange={(e) =>
                                                setEditedData({
                                                    ...editedData,
                                                    address: e.target.value,
                                                })
                                            }
                                        />
                                    ) : (
                                        user.address
                                    )}
                                </td>
                                <td>
                                    {editingUserId === user.id ? (
                                        <input
                                            value={editedData.avatar || ""}
                                            onChange={(e) =>
                                                setEditedData({
                                                    ...editedData,
                                                    address: e.target.value,
                                                })
                                            }
                                        />
                                    ) : (
                                        user.avatar
                                    )}
                                </td>
                                <td>
                                    {editingUserId === user.id ? (
                                        <button
                                            className="save-btn"
                                            onClick={() => handleSave(user.id)}
                                        >
                                            <Save size={18} />
                                        </button>
                                    ) : (
                                        <>
                                            <button
                                                className="edit-btn"
                                                onClick={() => handleEditClick(user)}
                                            >
                                                <Edit size={18} />
                                            </button>
                                            {/* <button
                                                className="delete-btn"
                                                onClick={() => deleteProduct(user.id)}
                                            >
                                                <Trash2 size={18} />
                                            </button> */}
                                        </>
                                    )}
                                </td>
                            </motion.tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </motion.div>
    );
};

export default UsersTable;


