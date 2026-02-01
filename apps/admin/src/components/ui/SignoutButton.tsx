import { Button } from "@shared";
import { useNavigate } from "react-router-dom";
import { LogOut } from "@shared/icons";
import { useLnbStore } from "@/store/lnbStore";
import { signOut } from "@/lib/auth";

export default function SignoutButton() {
  const navigate = useNavigate();
  const { isSidebarExpanded } = useLnbStore();

  const handleSignout = async () => {
    await signOut();
    navigate("/auth/signin", { replace: true });
  };

  return (
    <Button
      onClick={handleSignout}
      variant="none"
      size="md"
      className="!justify-start"
    >
      <LogOut className="text-black w-5 h-5" />
      {isSidebarExpanded && <span>로그아웃</span>}
    </Button>
  );
}
