import { TabsContent } from "@/components/ui/tabs";
import { PendingDoctors } from "./_components/pending-doctors";
import { VerifiedDoctors } from "./_components/verified-doctors";
import { getPendingDoctors, getVerifiedDoctors } from "@/actions/admin";


export default async function AdminPage() {
  const [pendingDoctorsData, verifiedDoctorsData, pendingPayoutsData] =
    await Promise.all([
      getPendingDoctors(),
      getVerifiedDoctors(),
    ]);

  return (
    <>
      <TabsContent value="pending" className="border-none p-0">
        <PendingDoctors doctors={pendingDoctorsData.doctors || []} />
      </TabsContent>

      <TabsContent value="doctors" className="border-none p-0">
        <VerifiedDoctors doctors={verifiedDoctorsData.doctors || []} />
      </TabsContent>
    </>
  );
}