import BlogsTable from "../../../components/Blogs/BlogsTable";
import Header from "../../../components/Header/Header";
import "./Blogspage.css";


const BlogsPage = () => {
  return (
    <div className="Blogs-container">
      <Header title="Blogs" />
      <main className="Blogs-content">
        {/* Table */}
        <BlogsTable/>        
      </main>
    </div>
  );
};

export default BlogsPage;
