
export default function RedirectProject() {
  const { proj } = useParams();

  useEffect(() => {
    const target = redirectMap[proj];
    if (target) window.location.href = target;
  }, [proj]);

  return <p>Redirecting...</p>;
}