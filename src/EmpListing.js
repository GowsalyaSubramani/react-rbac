import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const EmpListing = () => {
    const [empdata, empdatachange] = useState(null);
    const [haveedit, editchange] = useState(false);
    const [haveview, viewchange] = useState(false);
    const [haveadd, addchange] = useState(false);
    const [haveremove, removechange] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        GetUserAccess();
        loadEmployees();
    }, []);

    const GetUserAccess = () => {
        const userrole = sessionStorage.getItem('userrole') || '';
        fetch(`http://localhost:8000/roleaccess?role=${userrole}&menu=employee`)
            .then((res) => {
                if (!res.ok) {
                    navigate('/');
                    toast.warning('You are not authorized to access this page.');
                    return false;
                }
                return res.json();
            })
            .then((res) => {
                if (res && res.length > 0) {
                    viewchange(true);
                    const userobj = res[0];
                    editchange(userobj.haveedit);
                    addchange(userobj.haveadd);
                    removechange(userobj.havedelete);
                } else {
                    navigate('/');
                    toast.warning('You are not authorized to access this page.');
                }
            });
    };

    const loadEmployees = () => {
        fetch("http://localhost:8000/employee")
            .then((res) => res.json())
            .then((resp) => {
                empdatachange(resp);
            })
            .catch((err) => {
                console.log(err.message);
            });
    };

    const LoadDetail = (id) => {
        if (haveview) {
            navigate(`/employee/detail/${id}`);
        } else {
            toast.warning('You do not have access to view details.');
        }
    };

    const LoadEdit = (id) => {
        if (haveedit) {
            navigate(`/employee/edit/${id}`);
        } else {
            toast.warning('You do not have access to edit.');
        }
    };

    const Removefunction = (id) => {
        if (haveremove) {
            if (window.confirm('Do you want to remove?')) {
                fetch(`http://localhost:8000/employee/${id}`, {
                    method: "DELETE",
                })
                    .then((res) => {
                        if (res.ok) {
                            toast.success('Removed successfully.');
                            loadEmployees(); // Reload data
                        } else {
                            toast.error('Failed to remove the employee.');
                        }
                    })
                    .catch((err) => {
                        console.log(err.message);
                        toast.error('Error while removing.');
                    });
            }
        } else {
            toast.warning('You do not have access to remove.');
        }
    };

    return (
        <div className="container">
            <div className="card">
                <div className="card-title">
                    <h2>Employee Listing</h2>
                </div>
                <div className="card-body">
                    {haveadd && (
                        <div className="divbtn">
                            <Link to="employee/create" className="btn btn-success">Add New (+)</Link>
                        </div>
                    )}
                    <table className="table table-bordered">
                        <thead className="bg-dark text-white">
                            <tr>
                                <td>ID</td>
                                <td>Name</td>
                                <td>Email</td>
                                <td>Phone</td>
                                <td>Action</td>
                            </tr>
                        </thead>
                        <tbody>
                            {empdata &&
                                empdata.map((item) => (
                                    <tr key={item.id}>
                                        <td>{item.id}</td>
                                        <td>{item.name}</td>
                                        <td>{item.email}</td>
                                        <td>{item.phone}</td>
                                        <td>
                                            <button onClick={() => LoadEdit(item.id)} className="btn btn-success">Edit</button>
                                            <button onClick={() => Removefunction(item.id)} className="btn btn-danger">Remove</button>
                                            <button onClick={() => LoadDetail(item.id)} className="btn btn-primary">Details</button>
                                        </td>
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default EmpListing;
