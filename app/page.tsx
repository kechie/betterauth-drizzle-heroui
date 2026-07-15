//import Image from "next/image";
// TODO: Fonts
// Theming is ok na I think
import { Button, Chip, Description, Label, Link, Surface, ButtonGroup, Dropdown,  } from '@heroui/react';
import { ThemeSwitcher } from '@components/theme-switcher';
import {
  CodeFork,
} from "@gravity-ui/icons";
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Star,
  Pin,
  QrCode,
  Image,
  Video,
  TextAlignCenter,
  TextAlignJustify,
  TextAlignStart,
  TextAlignEnd,
  Ellipsis,
  ThumbsDown,
  ThumbsUp,
} from "lucide-react";

export default function Home() {
  return (
    <div className={`flex flex-col flex-1 items-center justify-center`} >
      <main className="py-32 px-16 sm:items-start">


        <div className="flex flex-col items-start gap-6">
          <ThemeSwitcher />
          {/* Single button with dropdown */}
          <div className="flex flex-col gap-2">
            <Button>Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="tertiary">Tertiary</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="danger">Danger</Button>
            <Button variant="danger-soft">Danger Soft</Button>
            <ButtonGroup>
              <Button>Merge pull request</Button>
              <Dropdown>
                <Button isIconOnly aria-label="More options">
                  <ButtonGroup.Separator />
                  <ChevronDown />
                </Button>
                <Dropdown.Popover className="max-w-[290px]" placement="bottom end">
                  <Dropdown.Menu>
                    <Dropdown.Item
                      className="flex flex-col items-start gap-1"
                      id="merge"
                      textValue="Create a merge commit"
                    >
                      <Label>Create a merge commit</Label>
                      <Description>
                        All commits from this branch will be added to the base branch
                      </Description>
                    </Dropdown.Item>
                    <Dropdown.Item
                      className="flex flex-col items-start gap-1"
                      id="squash-and-merge"
                      textValue="Squash and merge"
                    >
                      <Label>Squash and merge</Label>
                      <Description>
                        The 14 commits from this branch will be combined into one commit in the base
                        branch
                      </Description>
                    </Dropdown.Item>
                    <Dropdown.Item
                      className="flex flex-col items-start gap-1"
                      id="rebase-and-merge"
                      textValue="Rebase and merge"
                    >
                      <Label>Rebase and merge</Label>
                      <Description>
                        The 14 commits from this branch will be rebased and added to the base branch
                      </Description>
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown.Popover>
              </Dropdown>
            </ButtonGroup>
          </div>

          {/* Individual buttons */}
          <div className="flex flex-col gap-2">
            <div className="flex flex-wrap gap-x-2 gap-y-4">
              <ButtonGroup variant="tertiary">
                <Button>
                  <CodeFork className="size-3.5" />
                  Fork
                  <Chip color="accent" size="sm" variant="soft">
                    24
                  </Chip>
                </Button>
                <Button isIconOnly>
                  <ButtonGroup.Separator />
                  <ChevronDown />
                </Button>
              </ButtonGroup>
              <ButtonGroup variant="tertiary">
                <Button isIconOnly>
                  <QrCode />
                </Button>
                <Button>
                  <ButtonGroup.Separator />
                  Scan to pay
                </Button>
              </ButtonGroup>
              <ButtonGroup variant="tertiary">
                <Button>
                  <ThumbsUp />
                  <span className="text-xs font-semibold">2.4K</span>
                </Button>
                <Button isIconOnly>
                  <ButtonGroup.Separator />
                  <ThumbsDown />
                </Button>
              </ButtonGroup>
              <ButtonGroup variant="tertiary">
                <Button>
                  <Star className="size-3.5" />
                  Star
                </Button>
                <Button className="px-2">
                  <ButtonGroup.Separator />
                  <Chip color="accent" size="sm" variant="soft">
                    104
                  </Chip>
                </Button>
              </ButtonGroup>
              <ButtonGroup variant="tertiary">
                <Button>
                  <Pin />
                  Pinned
                </Button>
                <Button isIconOnly>
                  <ButtonGroup.Separator />
                  <ChevronDown />
                </Button>
              </ButtonGroup>
            </div>
          </div>

          {/* Previous/Next Button Group */}
          <div className="flex flex-col gap-2">
            <ButtonGroup variant="tertiary">
              <Button>
                <ChevronLeft />
                Previous
              </Button>
              <Button>
                <ButtonGroup.Separator />
                Next
                <ChevronRight />
              </Button>
            </ButtonGroup>
          </div>

          {/* Content Selection Button Group */}
          <div className="flex flex-col gap-2">
            <ButtonGroup variant="tertiary">
              <Button>
                <Image aria-label="Photos" />
                Photos
              </Button>
              <Button>
                <ButtonGroup.Separator />
                <Video aria-label="Videos" />
                Videos
              </Button>
              <Button isIconOnly aria-label="More options">
                <ButtonGroup.Separator />
                <Ellipsis aria-label="More options" />
              </Button>
            </ButtonGroup>
          </div>

          {/* Text Alignment Button Group */}
          <div className="flex flex-col gap-2">
            <ButtonGroup variant="tertiary">
              <Button>Left</Button>
              <Button>
                <ButtonGroup.Separator />
                Center
              </Button>
              <Button>
                <ButtonGroup.Separator />
                Right
              </Button>
            </ButtonGroup>
          </div>

          {/* Icon-Only Alignment Button Group */}
          <div className="flex flex-col gap-2">
            <ButtonGroup variant="tertiary">
              <Button isIconOnly>
                <TextAlignStart />
              </Button>
              <Button isIconOnly>
                <ButtonGroup.Separator />
                <TextAlignCenter />
              </Button>
              <Button isIconOnly>
                <ButtonGroup.Separator />
                <TextAlignEnd />
              </Button>
              <Button isIconOnly>
                <ButtonGroup.Separator />
                <TextAlignJustify />
              </Button>
            </ButtonGroup>
          </div>
        </div>
{/*         <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <p className="text-sm font-medium text-muted">Default</p>
            <Surface className="flex min-w-[320px] flex-col gap-3 rounded-3xl p-6" variant="default">
              <h3 className="text-base font-semibold text-foreground">Surface Content</h3>
              <p className="text-sm text-muted">
                This is a default surface variant. It uses bg-surface styling.
              </p>
            </Surface>
          </div>

          <div className="flex flex-col gap-2">
            <p className="text-sm font-medium text-muted">Secondary</p>
            <Surface className="flex min-w-[320px] flex-col gap-3 rounded-3xl p-6" variant="secondary">
              <h3 className="text-base font-semibold text-foreground">Surface Content</h3>
              <p className="text-sm text-muted">
                This is a secondary surface variant. It uses bg-surface-secondary styling.
              </p>
            </Surface>
          </div>

          <div className="flex flex-col gap-2">
            <p className="text-sm font-medium text-muted">Tertiary</p>
            <Surface className="flex min-w-[320px] flex-col gap-3 rounded-3xl p-6" variant="tertiary">
              <h3 className="text-base font-semibold text-foreground">Surface Content</h3>
              <p className="text-sm text-muted">
                This is a tertiary surface variant. It uses bg-surface-tertiary styling.
              </p>
            </Surface>
          </div>

          <div className="flex flex-col gap-2">
            <p className="text-sm font-medium text-muted">Transparent</p>
            <Surface
              className="flex min-w-[320px] flex-col gap-3 rounded-3xl border p-6"
              variant="transparent"
            >
              <h3 className="text-base font-semibold text-foreground">Surface Content</h3>
              <p className="text-sm text-muted">
                This is a transparent surface variant. It has no background, suitable for overlays and
                cards with custom backgrounds.
              </p>
              <Link href="/sign-in">
                <button>Sign In</button>
                <Link.Icon />
              </Link>
              <ThemeSwitcher />
            </Surface>
          </div>
        </div> */}

      </main>
    </div>
  );
}
