import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../store";
import { type Article } from "../features/Article/ArticleApi";
import { setCurrentArticle, setRelatedArticles } from "../features/Article/ArticleSlice";
import AuthNav from "../components/AuthNavigation";
import Comments from "../features/Article/components/Comments";
import ArticleCard from "../features/Article/components/ArticleCard";
import Footer from "../components/landing/Footer";

const ArticlePage: React.FC = () => {
  // const { id } = useParams<{ id: string }>(); // Unused for dummy data
  // const articleId = Number(id); // Unused for dummy data
  const dispatch = useDispatch();
  const { currentArticle, relatedArticles } = useSelector(
    (state: RootState) => state.article
  );

  useEffect(() => {
    // Dummy data for testing
    const dummyArticle: Article = {
      id: 1,
      title: "President Trump's foreign policy toward the Middle East",
      content: `It was only hours after US President-elect Donald Trump announced his intention to nominate former Arkansas Governor Mike Huckabee to be US Ambassador to Israel. Huckabee is known for his unparalleled support for settlements, especially in the West Bank, which he considers part.

      Following Trump's announcement, extremist Israeli minister Smotrich tweeted on X, saying, "2025 will be the year of Israeli sovereignty over Judea and Samaria," the name Israel uses for the West Bank. He stated that he had instructed the Settlement Authority and the Civil Administration (both subordinate to the Ministry of Defense) to begin preparing the necessary infrastructure to implement "sovereignty over the West Bank.

      This has led us to question the contours of the new foreign policy of the incoming Trump administration, particularly toward the Middle East, which is the focus of global conflict today. While Trump boasts of his unique leadership style, his choices for his cabinet team reveal the potential for more aggressive and hostile policies toward hot-button issues, particularly those related to the Palestinian issue and relations with Iran.

      In this article, we will examine the most prominent figures Trump has chosen to lead the United States. We will focus on the most prominent positions these figures have taken on regional issues, in an attempt to understand the future shape of foreign policy based on this.`,
      author_name: "Cameron Williamson",
      author_avatar: "https://i.pravatar.cc/150?u=cameron",
      date: "17 November 2024",
      category: "Politics",
      image: "https://picsum.photos/800/400",
    };

    const dummyRelated: Article[] = [
      {
        id: 2,
        title: "Consequat",
        content: "Minim dolor in amet nulla laboris enim dolore consequat proident fugiat culpa eiusmod.",
        author_name: "Cameron Williamson",
        author_avatar: "https://i.pravatar.cc/150?u=cameron",
        date: "16 January 2017",
        category: "Politics",
        image: "https://picsum.photos/400/200?random=1",
      },
      {
        id: 3,
        title: "Consequat",
        content: "Minim dolor in amet nulla laboris enim dolore consequat proident fugiat culpa eiusmod.",
        author_name: "Cameron Williamson",
        author_avatar: "https://i.pravatar.cc/150?u=cameron",
        date: "16 January 2017",
        category: "Politics",
        image: "https://picsum.photos/400/200?random=2",
      },
      {
        id: 4,
        title: "Consequat",
        content: "Minim dolor in amet nulla laboris enim dolore consequat proident fugiat culpa eiusmod.",
        author_name: "Cameron Williamson",
        author_avatar: "https://i.pravatar.cc/150?u=cameron",
        date: "16 January 2017",
        category: "Politics",
        image: "https://picsum.photos/400/200?random=3",
      },
      {
        id: 5,
        title: "Consequat",
        content: "Minim dolor in amet nulla laboris enim dolore consequat proident fugiat culpa eiusmod.",
        author_name: "Cameron Williamson",
        author_avatar: "https://i.pravatar.cc/150?u=cameron",
        date: "16 January 2017",
        category: "Politics",
        image: "https://picsum.photos/400/200?random=4",
      },
    ];

    dispatch(setCurrentArticle(dummyArticle));
    dispatch(setRelatedArticles(dummyRelated));
  }, [dispatch]);

  if (!currentArticle) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-xl">Chargement de l'article...</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <AuthNav />

      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6 flex-grow">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mt-12">
          {/* Main Content - Left Column */}
          <div className="lg:col-span-2 flex flex-col gap-8">
            <div>
              <p className="text-[#004aad] font-primary font-bold text-4xl mb-6 text-left">
                {currentArticle.category}
              </p>
              <img
                src={currentArticle.image ?? ''}
                alt={currentArticle.title}
                className="w-full h-[400px] object-cover rounded-2xl mb-6"
              />
              <h1 className="font-bold text-3xl text-left mb-2 font-primary">
                {currentArticle.title}
              </h1>
              <p className="text-gray-400 text-left text-sm mb-6">{currentArticle.date}</p>

              <div className="flex items-center gap-3 mb-8">
                <img
                  src={currentArticle.author_avatar ?? ''}
                  alt={currentArticle.author_name ?? ''}
                  className="w-10 h-10 rounded-full"
                />
                <span className="font-medium text-gray-900">{currentArticle.author_name}</span>
              </div>

              <div className="prose max-w-none text-left text-gray-700 leading-relaxed whitespace-pre-line font-secondary">
                {currentArticle.content}
              </div>
            </div>

            <Comments articleId={currentArticle.id} />
          </div>

          {/* Sidebar - Right Column */}
          <div className="flex flex-col gap-8">
            <div className="flex justify-between items-center">
              <h2 className="text-[#004aad] font-primary font-bold text-3xl">Related News</h2>
              <a href="#" className="text-[#004aad] text-sm hover:underline">See All</a>
            </div>

            <div className="flex flex-col gap-6">
              {relatedArticles.length > 0 ? (
                relatedArticles.map((article: Article) => (
                  <ArticleCard
                    key={article.id}
                    title={article.title}
                    image={article.image ?? ''}
                    author={article.author_name ?? ''}
                    date={article.date}
                    content={article.content}
                    avatar={article.author_avatar ?? ''}
                  />
                ))
              ) : (
                <div className="text-gray-500">Aucun article similaire trouvé</div>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ArticlePage;
