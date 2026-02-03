import { useEffect, useState } from "react";

export default function Welcome() {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(false);
    const [nextLink, setNextLink] = useState(null);
    const [prevLink, setPrevLink] = useState(null);

    const loadArticles = async (link = "/api/articles?limit=20") => {
        setLoading(true);
        try {
            const response = await fetch(link);
            if (!response.ok) throw new Error("Ошибка при загрузке статей");
            const data = await response.json();
            console.log(data);
            setArticles(data.data);
            setPrevLink(data.prev_page_url);
            setNextLink(data.next_page_url);
        } catch (err) {
            console.error(err);
        }
        setLoading(false);
    };

    const formatDate = (isoString) => {
        const d = new Date(isoString);
        return d.toLocaleString();
    };

    const loadNext = async () => {
        loadArticles(nextLink);
    };

    const loadPrev = async () => {
        loadArticles(prevLink);
    };

    useEffect(() => {
        loadArticles();
    }, []);

    return (
        <div className="box">
            {loading ? (
                <p>Загрузка статей...</p>
            ) : (
                <div>
                    <div className="articlesLinks_block">
                        {articles.map((article) => (
                            <a
                                className="articlesLinks_link"
                                href={`/article/${article.id}`}
                                key={article.id}
                            >
                                {article.title} Создан:{" "}
                                {formatDate(article.created_at)}
                            </a>
                        ))}
                    </div>
                    <div className="list_box">
                        <button
                            className="list_back"
                            disabled={prevLink == null}
                            onClick={loadPrev}
                        >
                            Назад
                        </button>
                        <button
                            className="list_next"
                            disabled={nextLink == null}
                            onClick={loadNext}
                        >
                            Вперед
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
