import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { useRecoilState } from "recoil";
import { Student } from "../../recoil/atoms";

import { backend_url } from "../../config";
import { Modal, Button, Table } from "react-bootstrap";
function StudentList() {
  const [students, setStudents] = useRecoilState(Student);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchstudents = async () => {
      try {
        const response = await axios.get(`${backend_url}/api/students`, {
          headers: { Authorization: localStorage.getItem("authToken") }, 
        });
        setStudents(response.data);
      } catch (error) {
        console.error(
          "Error fetching students:",
          error.response ? error.response.data : error.message
        );
      }
    };

    fetchstudents();
  }, []);

  const handleDelete = async (id) => {
    console.log(id)
    try {
      const res=await axios.delete(`${backend_url}/api/teachers/${id}`, {
        headers: {
          Authorization: ` ${localStorage.getItem("authToken")}`, // Add token for authentication
        },
      });
      console.log("res ");
      setStudents(students.filter((students) => students._id !== id));
    } catch (err) {
      console.log(err)
      setError(err.response?.data?.message || "Failed to delete students");
    }
  };

  const handleEditClick = (students) => {
    setSelectedStudent(students);
    setShowEditModal(true);
  };

  const handleEditSubmit = async () => {
    try {
      await axios.put(
        `${backend_url}/api/teachers/${selectedStudent._id}`,
        selectedStudent,
        {
          headers: {
            Authorization: `${localStorage.getItem("authToken")}`, // Add token for authentication
          },
        }
      );
      setStudents(
        students.map((students) =>
          students._id === selectedStudent._id ? selectedStudent : students
        )
      );
      setShowEditModal(false);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update students");
    }
  };
  return (
    <div>
      <h2 className="text-xl font-bold mb-4">students</h2>
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
          {students.map((students) => (
            <tr key={students._id}>
              <td>{students.name}</td>
              <td>{students.email}</td>
              <td>
                <Button
                  onClick={() => handleEditClick(students)}
                  variant="warning"
                >
                  Edit
                </Button>
                <Button
                  onClick={() => handleDelete(students._id)}
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
      <div> {students.length ? "" : "List is empty"}</div>

      {/* Edit Modal */}
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit students</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedStudent && (
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
                    value={selectedStudent.name}
                    onChange={(e) =>
                      setSelectedStudent({
                        ...selectedStudent,
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
                    value={selectedStudent.email}
                    onChange={(e) =>
                      setSelectedStudent({
                        ...selectedStudent,
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
}

export default StudentList;
