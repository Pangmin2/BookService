import { useState } from 'react';
import style from './BookEditModal.module.css';
import axios from 'axios';
import swal from 'sweetalert';

const BookEditModal = ({ book, onClose, onUpdate }) => {
    const [formData, setFormData] = useState({
        title: book.title,
        author: book.author,
        publisher: book.publisher,
        publishYear: book.publishYear,
        selectedFile: null
    });

    const SERVER = import.meta.env.VITE_SERVER_URL;
    const token = localStorage.getItem("accessToken");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleFileChange = (e) => {
        setFormData(prev => ({
            ...prev,
            selectedFile: e.target.files[0]
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            let fileId = book.fileId;

            // 새로운 이미지가 선택된 경우
            if (formData.selectedFile) {
                // 1. 파일 업로드 URL 요청
                const uploadResponse = await axios.post(
                    `${SERVER}/files/bookImage/upload-url`,
                    {
                        fileName: formData.selectedFile.name,
                        contentType: formData.selectedFile.type,
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                if (!uploadResponse.data.success) {
                    throw new Error("이미지 업로드 URL 받기 실패");
                }

                // 2. 파일 업로드
                const { url: uploadUrl, fileId: newFileId } = uploadResponse.data.data;
                await axios.put(uploadUrl, formData.selectedFile, {
                    headers: {
                        'Content-Type': formData.selectedFile.type,
                    },
                });

                fileId = newFileId;
            }

            // 3. 도서 정보 수정 API 호출
            const response = await axios.put(
                `${SERVER}/book/admin/${book.id}`,
                {
                    title: formData.title,
                    author: formData.author,
                    publisher: formData.publisher,
                    publishYear: parseInt(formData.publishYear),
                    fileId: fileId
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (response.data.success) {
                await swal("수정 완료", "도서 정보가 성공적으로 수정되었습니다.", "success");
                onUpdate(response.data.data);
                onClose();
            }
        } catch (error) {
            console.error("도서 수정 중 오류 발생:", error);
            swal("수정 실패", "도서 수정 중 오류가 발생했습니다.", "error");
        }
    };

    return (
        <div className={style.modalOverlay}>
            <div className={style.modalContent}>
                <h2>도서 정보 수정</h2>
                <form onSubmit={handleSubmit}>
                    <div className={style.formGroup}>
                        <label>제목</label>
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className={style.formGroup}>
                        <label>저자</label>
                        <input
                            type="text"
                            name="author"
                            value={formData.author}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className={style.formGroup}>
                        <label>발행처</label>
                        <input
                            type="text"
                            name="publisher"
                            value={formData.publisher}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className={style.formGroup}>
                        <label>발행년도</label>
                        <input
                            type="number"
                            name="publishYear"
                            value={formData.publishYear}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className={style.formGroup}>
                        <label>도서 이미지</label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                        />
                    </div>
                    <div className={style.buttonGroup}>
                        <button type="button" onClick={onClose} className={style.cancelButton}>
                            취소
                        </button>
                        <button type="submit" className={style.submitButton}>
                            수정
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default BookEditModal; 