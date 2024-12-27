import { Routes, Route } from 'react-router-dom';
import ViewClaimReconciliations from './ViewClaimRecoiliation';
import ClaimDetailView from '../ClaimDetailView';
import ClaimDetailEditView from '../ClaimDetailView/ClaimDetailEdit';
import NotFound from '../ComponentNotFound';

const ViewClaimReconciliation = () => {
  return (
    <div className="dashboard-content">
      <Routes>
        <Route path="/" element={<ViewClaimReconciliations />} />
        <Route path="claim-details-edit/:id" element={<ClaimDetailEditView />} />
        <Route path="claim-details/:id" element={<ClaimDetailView />} />
        {/* Any additional routes */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
};

export default ViewClaimReconciliation;
