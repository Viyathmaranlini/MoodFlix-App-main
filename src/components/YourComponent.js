import React, { useEffect } from 'react';
import { safeResizeObserverCallback } from '../utils/resizeObserverFix';

const YourComponent = () => {
    useEffect(() => {
        const resizeObserver = new ResizeObserver(
            safeResizeObserverCallback((entries) => {
                // Your resize logic here
                // ...existing code...
            })
        );

        resizeObserver.observe(document.querySelector('#your-element-id'));

        return () => {
            resizeObserver.disconnect();
        };
    }, []);

    return (
        <div id="your-element-id">
            {/* Your component content here */}
        </div>
    );
};

export default YourComponent;