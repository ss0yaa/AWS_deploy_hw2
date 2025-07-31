import styled from "styled-components";
import Button from "../components/Button";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const Wrapper = styled.div`
  margin-top: 50px;
  display: flex;
  flex-direction: column;
  gap: 30px;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const InputLabel = styled.div`
  color: var(--text-black);
  font-size: 30px;
  font-weight: 700;
`;

const StyledInput = styled.input`
  border: none;
  outline: none;
  background-color: white;
  padding: 10px 30px;
  border-radius: 15px;
  width: 300px;
  height: 50px;
  font-size: 18px;
  font-weight: 700;
  color: var(--text-black);
  &::placeholder {
    color: #acacac;
    font-weight: 700;
  }
`;

const StyledTxtarea = styled.textarea`
  border: none;
  outline: none;
  width: 100%;
  height: 200px;
  background-color: white;
  padding: 30px;
  border-radius: 15px;
  font-size: 18px;
  font-weight: 700;
  resize: none;
  color: var(--text-black);
  &::placeholder {
    color: #acacac;
    font-weight: 700;
  }
`;

const BtnWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const EditPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [author, setAuthor] = useState("");
  const [comment, setComment] = useState("");

  // 작성자 수정
  const onChangeAuthor = (e) => {
    setAuthor(e.target.value);
  };
  // 글 수정
  const onChangeComment = (e) => {
    setComment(e.target.value);
  };

  const getDetail = (id) => {
    // 수정이므로 일단 상세 페이지 내용 가져오기 -> get
    axios
      .get(`http://127.0.0.1:8000/entries/${id}/`)
      .then((response) => {
        console.log(response);
        setAuthor(response.data.author);
        setComment(response.data.comment);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // 컴포넌트 렌더링 시, 실행되는 코드 (id 변경될 때마다)
  useEffect(() => {
    console.log(`현재 ID는: ${id}`);
    if (id) getDetail(id);
  }, [id]);

  const editComment = () => {
    // 수정이므로 put
    axios
      .put(`http://127.0.0.1:8000/entries/${id}/`, {
        author: author,
        comment: comment,
      })
      .then((response) => {
        console.log(response);
        alert("게시글 수정이 완료되었습니다.");
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
        alert("게시글 수정에 실패했습니다.");
      });
  };

  return (
    <Wrapper>
      <FormGroup>
        <InputLabel>이름</InputLabel>
        <StyledInput
          placeholder="이름을 입력해주세요."
          value={author}
          onChange={onChangeAuthor}
        />
      </FormGroup>
      <FormGroup>
        <InputLabel>내용</InputLabel>
        <StyledTxtarea
          placeholder="게시글 내용을 입력해주세요."
          value={comment}
          onChange={onChangeComment}
        />
      </FormGroup>
      <BtnWrapper>
        <Button txt="수정하기" onBtnClick={editComment} />
      </BtnWrapper>
    </Wrapper>
  );
};

export default EditPage;
