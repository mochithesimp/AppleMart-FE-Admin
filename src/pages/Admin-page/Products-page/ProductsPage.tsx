import Header from '../../../components/Header/Header'
import StatCard from '../../../components/StatCard/StatCard'
import { motion } from "framer-motion";
import { AlertTriangle, DollarSign, Package, TrendingUp } from 'lucide-react';
import "./ProductsPage.css";
import ProductsTable from '../../../components/Products/ProductTable';
import CategoryDistributionChart from '../../../components/Charts/CategoryDistributionChart/CategoryDistributionChart';
import SalesTrendChart from '../../../components/Products/ProductsChart/SalesTrendChart';
import ProductItemsTable from '../../../components/Products/ProductItemtable';
import CategoryTable from '../../../components/Products/CategoryTable';

const ProductsPage = () => {
  return (
    <div className='Products-container'>
      <Header title='Products' />
      <main className='Products-content'>
        <motion.div
          className="stats-grid"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <StatCard name="Total Products" icon={Package} value="$12,345" color="#6366F1" />
          <StatCard name="Top Selling" icon={TrendingUp} value="1,234" color="#8B5CF6" />
          <StatCard name="Low Stock" icon={AlertTriangle} value="567" color="#EC4899" />
          <StatCard name="Total Revenue" icon={DollarSign} value="12.5%" color="#10B981" />
        </motion.div>
        {/* Table */}
        <CategoryTable/>
        <ProductsTable />
        <ProductItemsTable />    
        <div className='grid grid-col-1 lg:grid-cols-2 gap-8'>
					<SalesTrendChart />
					<CategoryDistributionChart />
				</div>
      </main>
    </div>
  )
}

export default ProductsPage