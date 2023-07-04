//pages/products/[productId].tsx
import { FC } from 'react'
import { useRouter } from 'next/router'
import ProductDetailedPage from '../../src/app/components/ProductDetailPage'

interface PageProps {
  productId: string;
}


const Page: FC<PageProps> = () => {
  const router = useRouter();
  let productId = router.query.productId as string;

  return (
    <>
      {/* map your productId here */}
      <ProductDetailedPage productId={productId} />
    </>
  );
};

export default Page;