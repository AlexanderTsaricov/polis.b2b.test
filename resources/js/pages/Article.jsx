import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function Article() {
    const { id } = useParams();
    const [loading, setLoading] = useState(false);
    const [article, setArticle] = useState(null);
    const [comments, setComments] = useState([]);
    const [formData, setFormData] = useState({ author_name: "", content: "" });
    const [sending, setSending] = useState(false);

    const loadArticle = async (id) => {
        const response = await fetch(`/api/articles/${id}`);
        if (!response.ok) throw new Error("Ошибка при загрузке статьи");
        const data = await response.json();
        setArticle(data.data);
    };

    const loadComments = async (id) => {
        const response = await fetch(`/api/articles/${id}/comments`);
        if (!response.ok) throw new Error("Ошибка при загрузке комментариев");
        const data = await response.json();
        setComments(data.data);
    };

    const loadAll = async () => {
        setLoading(true);
        await loadArticle(id);
        await loadComments(id);
        setLoading(false);
    };

    useEffect(() => {
        loadAll();
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSending(true);
        try {
            const response = await fetch(`/api/articles/${id}/comments`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
                body: JSON.stringify(formData),
            });
            if (!response.ok) {
                const errData = await response.json();
                throw new Error(
                    errData.message || "Ошибка при отправке комментария",
                );
            }
            const data = await response.json();
            setComments([...comments, data.data]);
            setFormData({ author_name: "", content: "" });
        } catch (err) {
            console.error(err);
        }
        setSending(false);
    };

    const formatDate = (isoString) => {
        const d = new Date(isoString);
        return d.toLocaleString();
    };

    if (loading || article == null) {
        return (
            <div className="load_box">
                <p className="load_text">Загрузка...</p>
            </div>
        );
    }

    return (
        <div className="box">
            <div className="contentBox">
                <div className="article_box">
                    <h1 className="article_header">{article.title}</h1>
                    <p className="article_create">
                        {formatDate(article.created_at)}
                    </p>
                    <p className="article_content">{article.content}</p>
                </div>

                <h2 className="article_header">Комментарии</h2>
                <div className="comments_box">
                    {comments.map((comment) => (
                        <div className="comments_container" key={comment.id}>
                            <p className="comments_author">
                                {comment.author_name}
                            </p>
                            <p className="comments_content">
                                {comment.content}
                            </p>
                            <p className="comments_time">
                                {formatDate(comment.created_at)}
                            </p>
                        </div>
                    ))}
                </div>

                <div className="commentForm_box">
                    <form onSubmit={handleSubmit}>
                        <div className="commentForm_inputBox">
                            <label
                                className="commentForm_label"
                                htmlFor="author_name"
                            >
                                Имя
                            </label>
                            <input
                                type="text"
                                id="author_name"
                                className="commentForm_input"
                                value={formData.author_name}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="commentForm_inputBox">
                            <label
                                className="commentForm_label"
                                htmlFor="content"
                            >
                                Комментарий
                            </label>
                            <textarea
                                id="content"
                                className="commentForm_input"
                                value={formData.content}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <button
                            className="commentForm_submit"
                            type="submit"
                            disabled={sending}
                        >
                            {sending ? "Отправка..." : "Отправить"}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
