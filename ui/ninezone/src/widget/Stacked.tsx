/*---------------------------------------------------------------------------------------------
|  $Copyright: (c) 2018 Bentley Systems, Incorporated. All rights reserved. $
 *--------------------------------------------------------------------------------------------*/
/** @module Widget */

import * as classnames from "classnames";
import * as React from "react";
import { Edge } from "../utilities/Rectangle";
import Content from "./rectangular/Content";
import ResizeGrip, { ResizeDirection } from "./rectangular/ResizeGrip";
import ResizeHandle from "./rectangular/ResizeHandle";
import CommonProps, { NoChildrenProps } from "../utilities/Props";
import "./Stacked.scss";

/** Available [[Stacked]] widget horizontal anchors. */
export enum HorizontalAnchor {
  Left,
  Right,
}

/** Available [[Stacked]] widget vertical anchors. */
export enum VerticalAnchor {
  Middle,
  Bottom,
}

/** Helpers for [[HorizontalAnchor]]. */
export class HorizontalAnchorHelpers {
  /** Class name of [[HorizontalAnchor.Left]] */
  public static readonly LEFT_CLASS_NAME = "nz-left-anchor";
  /** Class name of [[HorizontalAnchor.Right]] */
  public static readonly RIGHT_CLASS_NAME = "nz-right-anchor";

  /** @returns Class name of specified [[HorizontalAnchor]] */
  public static getCssClassName(anchor: HorizontalAnchor): string {
    switch (anchor) {
      case HorizontalAnchor.Left:
        return HorizontalAnchorHelpers.LEFT_CLASS_NAME;
      case HorizontalAnchor.Right:
        return HorizontalAnchorHelpers.RIGHT_CLASS_NAME;
    }
  }
}

/** Helpers for [[Anchor]]. */
export class VerticalAnchorHelpers {
  /** Class name of [[VerticalAnchor.Start]] */
  public static readonly MIDDLE_CLASS_NAME = "nz-middle-anchor";
  /** Class name of [[VerticalAnchor.End]] */
  public static readonly BOTTOM_CLASS_NAME = "nz-bottom-anchor";

  /** @returns Class name of specified [[VerticalAnchor]] */
  public static getCssClassName(anchor: VerticalAnchor): string {
    switch (anchor) {
      case VerticalAnchor.Middle:
        return VerticalAnchorHelpers.MIDDLE_CLASS_NAME;
      case VerticalAnchor.Bottom:
        return VerticalAnchorHelpers.BOTTOM_CLASS_NAME;
    }
  }
}

/** Properties of [[Stacked]] component. */
export interface StackedProps extends CommonProps, NoChildrenProps {
  /** Describes to which side the widget is horizontally anchored. Defaults to [[HorizontalAnchor.Right]] */
  horizontalAnchor?: HorizontalAnchor;
  /** Describes to which side the widget is vertically anchored. Defaults to [[VerticalAnchor.Middle]] */
  verticalAnchor?: VerticalAnchor;
  /** Content of this widget. */
  content?: React.ReactNode;
  /** Describes if the widget is being dragged. */
  isDragged?: boolean;
  /** True if widget is open, false otherwise. */
  isOpen?: boolean;
  /** Function called when resize action is performed. */
  onResize?: (x: number, y: number, handle: ResizeHandle) => void;
  /** Widget tabs. See: [[Draggable]], [[TabSeparator]], [[Tab]], [[Group]] */
  tabs?: React.ReactNode;
}

/**
 * Stacked widget is used to display multiple tabs and some content.
 * @note Should be placed in [[Zone]] component.
 */
// tslint:disable-next-line:variable-name
export const Stacked: React.StatelessComponent<StackedProps> = (props: StackedProps) => {
  const horizontalAnchor = props.horizontalAnchor === undefined ? HorizontalAnchor.Right : props.horizontalAnchor;
  const className = classnames(
    "nz-widget-stacked",
    HorizontalAnchorHelpers.getCssClassName(horizontalAnchor),
    VerticalAnchorHelpers.getCssClassName(props.verticalAnchor === undefined ? VerticalAnchor.Middle : props.verticalAnchor),
    !props.isOpen && "nz-is-closed",
    props.isDragged && "nz-is-dragged",
    props.className);

  return (
    <div className={className} style={props.style}>
      <div className="nz-content-area">
        <Content
          className="nz-content"
          anchor={horizontalAnchor}
          content={props.content}
        />
        <ResizeGrip
          className="nz-bottom-grip"
          direction={ResizeDirection.NorthSouth}
          onResize={(_x, y) => { props.onResize && props.onResize(0, y, Edge.Bottom); }}
        />
        <ResizeGrip
          className="nz-right-grip"
          direction={ResizeDirection.EastWest}
          onResize={(x) => { props.onResize && props.onResize(x, 0, Edge.Right); }}
        />
      </div>
      <div className="nz-tabs-column">
        <div className="nz-tabs">
          {props.tabs}
        </div>
        <div className="nz-left-grip-container">
          <ResizeGrip
            className="nz-left-grip"
            direction={ResizeDirection.EastWest}
            onResize={(x) => { props.onResize && props.onResize(x, 0, Edge.Left); }}
          />
        </div>
      </div>
      <ResizeGrip
        className="nz-top-grip"
        direction={ResizeDirection.NorthSouth}
        onResize={(_x, y) => { props.onResize && props.onResize(0, y, Edge.Top); }}
      />
    </div>
  );
};

export default Stacked;
