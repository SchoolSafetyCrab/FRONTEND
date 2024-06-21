import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import { useAtom } from 'jotai';
import studentDisActive from '@assets/images/job/disactive/jobStudentDisActive.svg';
import parentDisActive from '@assets/images/job/disactive/jobParentDisActive.svg';
import teacherDisActive from '@assets/images/job/disactive/jobTeacherDisActive.svg';

import studentActive from '@assets/images/job/active/jobStudentActive.svg';
import parentActive from '@assets/images/job/active/jobParentActive.svg';
import teacherActive from '@assets/images/job/active/jobTeachersActive.svg';
import '@styles/join/JoinIdDentity.css';
import { useState } from 'react';

import join from '../../api/join/JoinApi';
import {
  activeRoleAtom,
  idAtom,
  passwordAtom,
  nicknameAtom,
  iconImgAtom,
  phoneNumberAtom,
} from '../../store/join/Joinstore';

export default function JoinIdentity() {
  const [activeStudent, setActiveStudent] = useState(false);
  const [activeTeacher, setActiveTeacher] = useState(false);
  const [activeParent, setActiveParent] = useState(false);
  const [role, setActiveRole] = useAtom(activeRoleAtom);
  const [id] = useAtom(idAtom);
  const [password] = useAtom(passwordAtom);
  const [nickname] = useAtom(nicknameAtom);
  const [iconImg] = useAtom(iconImgAtom);
  const [phoneNumber] = useAtom(phoneNumberAtom);

  const navigate = useNavigate();

  const handleNext = async () => {
    const success = await join({
      id,
      password,
      nickname,
      iconImg,
      role,
      phoneNumber,
    });
    if (success) {
      navigate('/');
    }
  };

  const handleActiveStudent = () => {
    setActiveStudent(true);
    setActiveTeacher(false);
    setActiveParent(false);
    setActiveRole('ROLE_STUDENT');
  };

  const handleActiveTeacher = () => {
    setActiveStudent(false);
    setActiveTeacher(true);
    setActiveParent(false);
    setActiveRole('ROLE_TEACHER');
  };

  const handleActiveParent = () => {
    setActiveStudent(false);
    setActiveTeacher(false);
    setActiveParent(true);
    setActiveRole('ROLE_PARENTS');
  };

  // 완료 버튼의 활성화 상태는 세 버튼 중 하나가 활성화되어 있는지로 결정합니다.
  const isFinishDisabled = !(activeStudent || activeTeacher || activeParent);

  return (
    <>
      <section className="join-dentity-header">
        <h1>
          마지막 단계예요!
          <br />
          직업을 선택해 주세요.
        </h1>
      </section>

      <section className="join-dentity-select">
        <div className="card-container">
          <button
            type="button"
            className="card"
            onClick={handleActiveStudent}
            style={{
              background: activeStudent ? '#FFB800' : '#ffffff',
            }}
          >
            {activeStudent ? (
              <img src={studentActive} alt="학생" />
            ) : (
              <img src={studentDisActive} alt="학생" />
            )}
          </button>
          <button
            type="button"
            className="card"
            onClick={handleActiveTeacher}
            style={{
              background: activeTeacher ? '#FFB800' : '#ffffff',
            }}
          >
            {activeTeacher ? (
              <img src={teacherActive} alt="선생님" />
            ) : (
              <img src={teacherDisActive} alt="선생님" />
            )}
          </button>
          <button
            type="button"
            className="card"
            onClick={handleActiveParent}
            style={{
              background: activeParent ? '#FFB800' : '#ffffff',
            }}
          >
            {activeParent ? (
              <img src={parentActive} alt="부모님" />
            ) : (
              <img src={parentDisActive} alt="부모님" />
            )}
          </button>
        </div>
      </section>

      <section className="join-dentity-btn">
        <div className="buttonContainer">
          <Button
            className="agreement-btn custom-button"
            variant="primary"
            size="lg"
            onClick={handleNext}
            disabled={isFinishDisabled}
            style={{
              backgroundColor: isFinishDisabled ? '#DDDBD6' : '#FFB800',
              color: 'white',
              border: 'none',
            }}
          >
            완료
          </Button>
        </div>
      </section>
    </>
  );
}
