import React, { useCallback, useMemo, memo } from "react";
import PropTypes from "prop-types";
import { RotatingLines } from "react-loader-spinner";

/**
 * プログレスモーダル表示用コンポーネント
 *
 * @param {Object} props モダール表示内容を包有したオブジェクト
 * @param {string} props.width モーダルの幅
 * @param {'primary' | 'secondary'} props.color モーダルの色
 * @param {'allView' | 'sectionView'} props.variant モーダル表示領域を画面全体、要素内いずれかに指定する設定値
 * @param {string} props.animationDuration モーダルアニメーションのスピード
 */
const MemoizedProgress = memo((props) => {
  const {
    width = "20%",
    color = "primary",
    variant = "allView",
    animationDuration = "1",
  } = props;

  const baseStyles = {
    zIndex: 99,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  const generateStyles = useCallback(() => {
    switch (variant) {
      case "allView":
        return {
          width: "100vw",
          height: "100vh",
          position: "fixed",
          top: 0,
          left: 0,
          backgroundColor: "rgba(0, 0, 0, 0.4)",
          ...baseStyles,
        };
      case "sectionView":
      default:
        return {
          width: "100%",
          minHeight: 400,
          height: "100%",
          ...baseStyles,
        };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [variant]);
  const styles = useMemo(generateStyles, [generateStyles]);

  const generateColor = useCallback(() => {
    switch (color) {
      case "secondary":
        return "#FF5733";
      case "primary":
      default:
        return "#6495ED";
    }
  }, [color]);
  const strokeColor = useMemo(generateColor, [generateColor]);

  return (
    <div style={styles}>
      <RotatingLines
        width={width}
        animationDuration={animationDuration}
        strokeColor={strokeColor}
      />
    </div>
  );
});

MemoizedProgress.propTypes = {
  width: PropTypes.string,
  color: PropTypes.oneOf(["primary", "secondary"]),
  variant: PropTypes.oneOf(["allView", "sectionView"]),
  animationDuration: PropTypes.string,
};

MemoizedProgress.displayName = "ProgressModal";

export { MemoizedProgress as ProgressModal };
