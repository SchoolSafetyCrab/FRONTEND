import React from 'react';

interface StudentFindGroupProps {
  query: string;
}

const StudentFindGroup: React.FC<StudentFindGroupProps> = ({ query }) => {
  return (
    <div>
      {/* query를 기반으로 한 렌더링 로직 */}
      <p>Search results for</p>
      {query}
      {/* 추가 컴포넌트 로직 */}
    </div>
  );
};

export default StudentFindGroup;
