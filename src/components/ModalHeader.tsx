import Typography from './Typography'

function ModalHeader({
    title = undefined,
    onClose,
    className = '',
}: {
    title?: string
    className?: string
    onClose: () => void
}): JSX.Element {
    return (
        <div className={`relative mb-2 ${className}`}>
            {title && (
                <Typography component="h2" variant="h5" className="mt-2.5 font-bold">
                    {title}
                </Typography>
            )}
            <div
                className="absolute top-0 right-0 w-5 h-5 rounded-full border-2 text-primary hover:text-high-emphesis border-primary  flex items-center justify-center cursor-pointer"
                onClick={onClose}
            >
                <svg width="8px" height="8px" viewBox="0 0 8 8" xmlns="http://www.w3.org/2000/svg">
                    <path
                        className="stroke-current stroke-1"
                        d="M6.8746 7.54507C6.6953 7.54507 6.52679 7.47526 6.40003 7.34844L4.00001 4.94841L1.60003 7.34844C1.47327 7.47526 1.30473 7.54507 1.12547 7.54507C0.946204 7.54507 0.777659 7.47526 0.650905 7.34844C0.524152 7.22169 0.454346 7.05317 0.454346 6.87394C0.454346 6.69468 0.524152 6.52616 0.650905 6.39938L3.05093 3.99934L0.650905 1.5993C0.389254 1.33762 0.389254 0.911858 0.650905 0.650175C0.777659 0.52342 0.946174 0.453613 1.12547 0.453613C1.30473 0.453613 1.47327 0.52342 1.60003 0.650175L4.00005 3.05021L6.40007 0.650175C6.52685 0.52342 6.69536 0.453613 6.87463 0.453613C7.05386 0.453613 7.22237 0.52342 7.34912 0.650175C7.47591 0.776929 7.54568 0.945476 7.54568 1.12474C7.54568 1.304 7.47591 1.47255 7.34912 1.5993L4.94911 3.99934L7.34919 6.39938C7.47597 6.52616 7.54578 6.69468 7.54578 6.87394C7.54578 7.05317 7.47597 7.22169 7.34919 7.34844C7.22234 7.47523 7.05383 7.54507 6.8746 7.54507ZM4.00001 4.90511L6.42168 7.3268C6.54262 7.4478 6.70348 7.51445 6.8746 7.51445C7.04565 7.51445 7.20651 7.4478 7.32751 7.3268C7.44848 7.20586 7.51513 7.04503 7.51513 6.87394C7.51513 6.70285 7.44848 6.54199 7.32751 6.42102L4.90578 3.99934L7.32745 1.57766C7.44842 1.45669 7.51504 1.29583 7.51504 1.12474C7.51504 0.95365 7.44842 0.792819 7.32745 0.671851C7.20651 0.550883 7.04568 0.484261 6.8746 0.484261C6.70351 0.484261 6.54265 0.550883 6.42168 0.671851L4.00001 3.09354L1.57835 0.671851C1.45738 0.550883 1.29652 0.484261 1.12543 0.484261C0.954348 0.484261 0.793519 0.550883 0.672552 0.671851C0.422841 0.921594 0.422841 1.32791 0.672552 1.57766L3.09422 3.99934L0.672552 6.42102C0.551585 6.54199 0.484962 6.70285 0.484962 6.87394C0.484962 7.04503 0.551585 7.20586 0.672552 7.3268C0.793549 7.4478 0.954379 7.51445 1.12547 7.51445C1.29655 7.51445 1.45738 7.4478 1.57838 7.3268L4.00001 4.90511Z"
                    />
                </svg>
            </div>
        </div>
    )
}

export default ModalHeader
