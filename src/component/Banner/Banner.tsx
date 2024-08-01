import React, { ReactNode } from 'react'
import { Button } from '../Button/Button'
import { useNavigate } from 'react-router-dom'
import { useAppSelector } from 'src/store/hooks'
import { RootState } from 'src/store'
import { useStudents } from 'src/hooks/useStudents'


interface Props {
  children: ReactNode
}

function Banner({ children }: Props) {
  const navigate = useNavigate()
  const { removeStudent } = useStudents();




  const { id } = useAppSelector((state: RootState) => state.dataSlice);

  const removeGeneral = async () => {
    const message = `Are you sure you want to delete this item?`;
    if (window.confirm(message)) {
      try {
        if (id) {
          await removeStudent(id)
          window.location.reload()
        }
      } catch (error) {
        console.error('Error removing student:', error);
      }
    }
  };
  return (
    <div>
      <div className="baners">
        <div className="textalign">
          <h1 className="text">Manage</h1>
          <h1 className="textsmart">Employees</h1>
        </div>

        <div className="sidebuttons">
          <Button className="buttoncolor1" onClick={() => removeGeneral()}>Delete</Button>
          <Button className="buttoncolor2" onClick={() => navigate('/add')}>Add New Employee</Button>
        </div>

      </div>
      {children}

    </div>

  )
}

export default Banner