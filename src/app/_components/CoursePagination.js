// import Link from "next/link";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

// lib/pagination.ts
function getPaginationPages(
    current,
    total,
    delta = 2
  ) {
    const pages = [];
  
    const rangeStart = Math.max(2, current - delta);
    const rangeEnd = Math.min(total - 1, current + delta);
  
    pages.push(1);
  
    if (rangeStart > 2) {
      pages.push("...");
    }
  
    for (let i = rangeStart; i <= rangeEnd; i++) {
      pages.push(i);
    }
  
    if (rangeEnd < total - 1) {
      pages.push("...");
    }
  
    if (total > 1) {
      pages.push(total);
    }
  
    return pages;
  }
  
export default function CoursePagination({ page, totalPages }) {
  const pages = getPaginationPages(page, totalPages);
  return (
    <Pagination>
      <PaginationContent>
        {/* 上一页 */}
        {page > 1 && (
          <PaginationItem>
            <PaginationPrevious  href={`?page=${page - 1}`}>
              {/* <Link href={`?page=${page - 1}`} /> */}
            </PaginationPrevious>
          </PaginationItem>
        )}

        {/* 页码 */}
        {pages.map((p, i) => (
          <PaginationItem key={i}>
            {p === "..." ? (
              <PaginationEllipsis />
            ) : (
              <PaginationLink isActive={p === page} href={`?page=${p}`}>
                {/* <Link >{p}</Link> */}
                {p}
              </PaginationLink>
            )}
          </PaginationItem>
        ))}

        {/* 下一页 */}
        {page < totalPages && (
          <PaginationItem>
            <PaginationNext href={`?page=${page + 1}`}>
              {/* <Link href={`?page=${page + 1}`} /> */}
            </PaginationNext>
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  );
}
