import { useRouter } from 'next/router';
import VehicleForm from '../components/VehicleForm';

export default function Vehicle() {
  const router = useRouter();
  const { serviceId } = router.query;

  if (!serviceId || Array.isArray(serviceId)) return null;

  return <VehicleForm serviceId={serviceId} />;
}
