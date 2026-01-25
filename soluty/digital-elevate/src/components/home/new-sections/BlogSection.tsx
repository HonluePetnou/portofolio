import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export function BlogSection() {
  const posts = [
    {
      id: 1,
      title: "Clever ways to invest in product to organize your portfolio",
      excerpt:
        "Discover smart investment strategies to streamline and organize your portfolio.",
      image:
        "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2000&auto=format&fit=crop",
      date: "Sep 26, 2023",
      author: "Steven Nice",
      avatar: "https://i.pravatar.cc/100?img=1",
      featured: true,
    },
    {
      id: 2,
      title: "How to grow your profit through systematic investment",
      excerpt:
        "Unlock the power of systematic investment with us and watch your profits soar.",
      image:
        "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=2070&auto=format&fit=crop",
      date: "Oct 26, 2023",
      author: "Alexa Kimberly",
      avatar: "https://i.pravatar.cc/100?img=5",
      featured: false,
    },
    {
      id: 3,
      title: "How to analyze every holdings of your portfolio",
      excerpt:
        "Our comprehensive guide will equip you with the tools and insights needed.",
      image:
        "https://images.unsplash.com/photo-1553877615-30c73a949d61?q=80&w=2070&auto=format&fit=crop",
      date: "Dec 26, 2023",
      author: "John Doe",
      avatar: "https://i.pravatar.cc/100?img=3",
      featured: false,
    },
  ];

  const featuredPost = posts.find((p) => p.featured);
  const regularPosts = posts.filter((p) => !p.featured);

  return (
    <section className="py-24 bg-slate-50" data-theme="light">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row justify-between items-start mb-12 gap-6">
          <div className="max-w-2xl">
            <h2 className="text-4xl md:text-5xl font-extrabold font-mont text-brand-navy mb-4">
              Our recent blogs
            </h2>
            <p className="text-slate-500 text-base">
              Surround yourself with the community and resources to help bring
              your vision to life.
            </p>
          </div>
          <Button
            variant="outline"
            className="border-slate-300 text-slate-700 hover:bg-slate-50 rounded-lg px-6 h-11 font-medium"
            asChild
          >
            <Link to="/blog">View All</Link>
          </Button>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Featured Post - Takes full height on left */}
          {featuredPost && (
            <motion.article
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="group bg-white rounded-2xl overflow-hidden border border-slate-200 hover:shadow-xl transition-all duration-300 flex flex-col"
            >
              <div className="relative h-72 overflow-hidden">
                <img
                  src={featuredPost.image}
                  alt={featuredPost.title}
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              <div className="p-8 flex flex-col flex-grow">
                <h3 className="text-2xl font-bold text-brand-navy mb-4 leading-tight group-hover:text-brand-blue transition-colors">
                  <Link to={`/blog/${featuredPost.id}`}>
                    {featuredPost.title}
                  </Link>
                </h3>

                <p className="text-slate-500 text-base mb-6 leading-relaxed flex-grow">
                  {featuredPost.excerpt}
                </p>

                <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                  <div className="flex items-center gap-3">
                    <img
                      src={featuredPost.avatar}
                      alt={featuredPost.author}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <div className="text-sm font-semibold text-brand-navy">
                        {featuredPost.author}
                      </div>
                      <div className="text-xs text-slate-400">
                        {featuredPost.date}
                      </div>
                    </div>
                  </div>

                  <Link
                    to={`/blog/${featuredPost.id}`}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-brand-blue text-white text-sm font-semibold hover:bg-brand-blue/90 transition-colors"
                  >
                    Read More
                  </Link>
                </div>
              </div>
            </motion.article>
          )}

          {/* Horizontal Posts - Stacked on right */}
          <div className="flex flex-col gap-6">
            {regularPosts.map((post, i) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="group bg-white rounded-2xl overflow-hidden border border-slate-200 hover:shadow-xl transition-all duration-300"
              >
                <div className="flex flex-col sm:flex-row h-full">
                  <div className="relative sm:w-56 h-56 sm:h-auto overflow-hidden flex-shrink-0">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>

                  <div className="p-6 flex flex-col justify-between flex-grow">
                    <div>
                      <h3 className="text-xl font-bold text-brand-navy mb-3 leading-tight group-hover:text-brand-blue transition-colors">
                        <Link to={`/blog/${post.id}`}>{post.title}</Link>
                      </h3>

                      <p className="text-slate-500 text-sm mb-4 leading-relaxed line-clamp-2">
                        {post.excerpt}
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                      <div className="flex items-center gap-3">
                        <img
                          src={post.avatar}
                          alt={post.author}
                          className="w-10 h-10 rounded-full object-cover"
                        />
                        <div>
                          <div className="text-sm font-semibold text-brand-navy">
                            {post.author}
                          </div>
                          <div className="text-xs text-slate-400">
                            {post.date}
                          </div>
                        </div>
                      </div>

                      <Link
                        to={`/blog/${post.id}`}
                        className="inline-flex items-center gap-2 text-sm font-semibold text-brand-blue hover:gap-3 transition-all"
                      >
                        Read More <ArrowRight size={16} />
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
