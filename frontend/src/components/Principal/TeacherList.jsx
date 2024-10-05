import React, { useEffect, useState } from "react";
import axios from "axios";
import { backend_url } from "../../config";
import { Modal, Button, Table } from "react-bootstrap";
import { useRecoilState } from "recoil";
import { Teachers } from "../../recoil/atoms";

const TeacherList = () => {
  const [teachers, setTeachers] = useRecoilState(Teachers);
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const response = await axios.get(`${backend_url}/api/teachers`, {
          headers: {
            Authorization: `${localStorage.getItem("authToken")}`, // Add token for authentication
          },
        });
        setTeachers(response.data);
      } catch (err) {
        setError(err.response?.data?.message || "Something went wrong!");
      }
    };

    fetchTeachers();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${backend_url}/api/teachers/${id}`, {
        headers: {
          Authorization: ` ${localStorage.getItem("autToken")}`, // Add token for authentication
        },
      });
      setTeachers(teachers.filter((teacher) => teacher._id !== id));
    } catch (err) {
      setError(err.response?.data?.message || "Failed to delete teacher");
    }
  };

  const handleEditClick = (teacher) => {
    setSelectedTeacher(teacher);
    setShowEditModal(true);
  };

  const handleEditSubmit = async () => {
    try {
      await axios.put(
        `${backend_url}/api/teachers/${selectedTeacher._id}`,
        selectedTeacher,
        {
          headers: {
            Authorization: `${localStorage.getItem("authToken")}`, // Add token for authentication
          },
        }
      );
      setTeachers(
        teachers.map((teacher) =>
          teacher._id === selectedTeacher._id ? selectedTeacher : teacher
        )
      );
      setShowEditModal(false);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update teacher");
    }
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Teachers</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {teachers.map((teacher) => (
            <tr key={teacher._id}>
              <td>{teacher.name}</td>
              <td>{teacher.email}</td>
              <td>
                <Button
                  onClick={() => handleEditClick(teacher)}
                  variant="warning"
                >
                  Edit
                </Button>
                <Button
                  onClick={() => handleDelete(teacher._id)}
                  variant="danger"
                  className="ms-2"
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <div> {teachers.length ? "" : "List is empty"}</div>

      {/* Edit Modal */}
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Teacher</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedTeacher && (
            <div>
              <form>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="form-control"
                    value={selectedTeacher.name}
                    onChange={(e) =>
                      setSelectedTeacher({
                        ...selectedTeacher,
                        name: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="form-control"
                    value={selectedTeacher.email}
                    onChange={(e) =>
                      setSelectedTeacher({
                        ...selectedTeacher,
                        email: e.target.value,
                      })
                    }
                  />
                </div>
              </form>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEditModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleEditSubmit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default TeacherList;
