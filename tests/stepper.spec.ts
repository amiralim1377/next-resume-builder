import { test, expect } from "@playwright/test";

test.describe("تست پایداری و عدم جابجایی استپر فرم", () => {
  test("بررسی دقیق مختصات فیزیکی و ظاهری در زمان کلیک", async ({ page }) => {
    await page.goto("http://localhost:3000/fa/panel/new", {
      waitUntil: "networkidle",
    });

    const stepperContainer = page.locator(".stepper-container");
    await expect(stepperContainer).toBeVisible();

    const firstStepText = page.getByText("اطلاعات پایه").first();

    const containerBefore = await stepperContainer.boundingBox();
    const boundingBoxBefore = await firstStepText.boundingBox();

    expect(containerBefore).not.toBeNull();
    expect(boundingBoxBefore).not.toBeNull();

    await expect(stepperContainer).toHaveScreenshot(
      "stepper-state-initial.png",
      {
        animations: "disabled",
      },
    );

    const targetStep = page.getByText("سوابق شغلی").first();
    await targetStep.click();

    await page.waitForTimeout(300);

    await expect(stepperContainer).toHaveScreenshot(
      "stepper-state-clicked.png",
      {
        animations: "disabled",
      },
    );

    const containerAfter = await stepperContainer.boundingBox();
    const boundingBoxAfter = await firstStepText.boundingBox();

    expect(containerAfter).not.toBeNull();
    expect(boundingBoxAfter).not.toBeNull();

    if (
      containerBefore &&
      boundingBoxBefore &&
      containerAfter &&
      boundingBoxAfter
    ) {
      const isRtl = page.url().includes("/fa/");

      const relativeXBefore = isRtl
        ? containerBefore.x +
          containerBefore.width -
          (boundingBoxBefore.x + boundingBoxBefore.width)
        : boundingBoxBefore.x - containerBefore.x;

      const relativeXAfter = isRtl
        ? containerAfter.x +
          containerAfter.width -
          (boundingBoxAfter.x + boundingBoxAfter.width)
        : boundingBoxAfter.x - containerAfter.x;

      const relativeYBefore = boundingBoxBefore.y - containerBefore.y;
      const relativeYAfter = boundingBoxAfter.y - containerAfter.y;

      const ratioXBefore = relativeXBefore / containerBefore.width;
      const ratioXAfter = relativeXAfter / containerAfter.width;

      const ratioYBefore = relativeYBefore / containerBefore.height;
      const ratioYAfter = relativeYAfter / containerAfter.height;

      const widthRatioBefore = boundingBoxBefore.width / containerBefore.width;
      const widthRatioAfter = boundingBoxAfter.width / containerAfter.width;

      expect(ratioXAfter).toBeCloseTo(ratioXBefore, 2);
      expect(ratioYAfter).toBeCloseTo(ratioYBefore, 2);
      expect(widthRatioAfter).toBeCloseTo(widthRatioBefore, 2);
    }
  });
});
