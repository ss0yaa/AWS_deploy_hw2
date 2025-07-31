import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import Button from "../components/Button";

const Container = styled.div`
  margin-top: 5rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ConfirmBox = styled.div`
  background-color: white;
  border-radius: 1.25rem;
  padding: 3rem;
  box-shadow: 0 0 0.625rem rgba(0, 0, 0, 0.15);
  text-align: center;
`;

const Message = styled.div`
  font-size: 1.875rem;
  font-weight: 700;
  margin-bottom: 2rem;
`;

const BtnWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 2rem;
  justify-content: center;
`;

const DeletePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const baseURL = import.meta.env.VITE_API_BASE_URL;

  // 삭제 실행
  const deleteComment = () => {
    // 삭제이므로 delete
    axios
      .delete(`${baseURL}/entries/${id}/`)
      .then(() => {
        alert("게시글 삭제가 완료되었습니다.");
        navigate("/");
      })
      .catch((err) => {
        console.error(err);
        alert("게시글 삭제에 실패했습니다.");
        navigate(-1); // 이전 페이지로
      });
  };

  const cancelDelete = () => {
    navigate(-1); // 이전 페이지로
  };

  return (
    <Container>
      <ConfirmBox>
        <Message>정말 삭제하시겠습니까?</Message>
        <BtnWrapper>
          <Button txt="예" onBtnClick={deleteComment} />
          <Button txt="아니오" onBtnClick={cancelDelete} />
        </BtnWrapper>
      </ConfirmBox>
    </Container>
  );
};

export default DeletePage;
