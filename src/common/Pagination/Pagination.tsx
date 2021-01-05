import React from 'react';

import './Pagination.scss';

const className = 'pagination';

export const Pagination: React.FC<{
    count: number,
    position: number,
    addtitionalClass?: string,
    callBack: Function,
    maxCount?: number,
}> = ({ position, count = 0, addtitionalClass = '', callBack, maxCount = 6 }) =>  {
    const buttons = [];

    for (let i = 0; i < count; i++) {
        const distinction = i - position;
        const half = maxCount / 2;
        if (
            (
                ((distinction + 1 >= 0) && (distinction > half)) ||
                (position - (i + 1) < half)
            ) &&
            (buttons.length < maxCount)
        ) {
            const value = i + 1;
            const isActive = value === position;
            buttons.push(
                <button
                    key={i}
                    value={value}
                    className={`${className}__button ${isActive ? 'active' : ''}`}
                    onClick={() => isActive ? null : callBack(value)}
                >
                    {value}
                </button>);
        }
    }

    return (
        <div className={`${className} ${addtitionalClass}`}>
            {buttons}
        </div>
    );
};
