import Header from '../../../components/Header/Header'
import "./ProductsPage.css";
import ProductsTable from '../../../components/Products/ProductTable';
import CategoryDistributionChart from '../../../components/Charts/CategoryDistributionChart/CategoryDistributionChart';
import SalesTrendChart from '../../../components/Products/ProductsChart/SalesTrendChart';
import ProductItemsTable from '../../../components/Products/ProductItemtable';
import CategoryTable from '../../../components/Products/CategoryTable';
import ProductItemAttributeTable from '../../../components/Products/ProductsChart/ProductItemAttributeTable';


const ProductsPage = () => {

  return (
    <div className='Products-container'>
      <Header title='Products' />
      <main className='Products-content'>
       
        {/* Table */}
        <CategoryTable/>
        <ProductsTable />
        <ProductItemsTable />
        <ProductItemAttributeTable/>    
        <div className='grid grid-col-1 lg:grid-cols-2 gap-8'>
					<SalesTrendChart />
					<CategoryDistributionChart />
				</div>
      </main>
    </div>
  )
}

export default ProductsPage