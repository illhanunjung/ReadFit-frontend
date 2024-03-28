import { useSearchParams } from "react-router-dom";

const KakoRedirectPage = () => {
    
    const [searchParams] = useSearchParams()

    const authCode = searchParams.get("code")
}