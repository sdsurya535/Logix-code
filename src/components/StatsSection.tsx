import React from "react";

const StatsSection = () => {
  return (
    <section className="py-24 bg-blue-600 dark:bg-blue-700 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-12 text-center">
          <div>
            <div className="text-5xl sm:text-6xl font-bold mb-2">5k+</div>
            <div className="text-blue-100 font-medium uppercase tracking-widest text-sm">
              Graduated Students
            </div>
          </div>
          <div>
            <div className="text-5xl sm:text-6xl font-bold mb-2">200+</div>
            <div className="text-blue-100 font-medium uppercase tracking-widest text-sm">
              Hiring Partners
            </div>
          </div>
          <div>
            <div className="text-5xl sm:text-6xl font-bold mb-2">95%</div>
            <div className="text-blue-100 font-medium uppercase tracking-widest text-sm">
              Placement Rate
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
