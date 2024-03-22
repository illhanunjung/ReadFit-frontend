import React, { useState } from "react";
import "../css/cmenu.css"; // 적절한 경로로 변경해주세요.

function CMenu() {
  const [activeCategory, setActiveCategory] = useState(null);

  // 예시 카테고리 데이터
  const categories = {
    "운동화/스니커즈": ["나이키", "아디다스", "뉴발란스"],
    구두: ["정장화", "캐주얼화", "로퍼"],
    "슬리퍼/실내화": ["비치슬리퍼", "일상용 슬리퍼", "욕실 슬리퍼"],
    기능화: ["기능화", "드라이빙화", "보트슈즈"],
    드라이빙화: ["나이키", "아디다스", "뉴발란스"],
    보트슈즈: ["정장화", "캐주얼화", "로퍼"],
    샌들: ["비치슬리퍼", "일상용 슬리퍼", "욕실 슬리퍼"],
    워커부츠: ["기능화", "드라이빙화", "보트슈즈"],
    "모카신/털신": ["기능화", "드라이빙화", "보트슈즈"],
  };

  // 카테고리 클릭 핸들러
  const handleToggleCategory = (category) => {
    // 이미 활성화된 카테고리를 다시 클릭하면 닫히도록 설정
    setActiveCategory(activeCategory === category ? null : category);
  };

  return (
    <div className="cmenu my-5">
      {Object.entries(categories).map(([mainCategory, subCategories]) => (
        <div
          key={mainCategory}
          className={`main-category ${
            activeCategory === mainCategory ? "active" : ""
          }`}
          onClick={() => handleToggleCategory(mainCategory)}
        >
          {mainCategory}
          {activeCategory === mainCategory && (
            <div className="sub-category-list">
              {subCategories.map((subCategory) => (
                <div key={subCategory} className="sub-category">
                  {subCategory}
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default CMenu;
